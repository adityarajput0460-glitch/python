/* Pyodide Web Worker
   Runs Python code in isolation so the UI thread never freezes.
   Loaded from CDN — ~8MB on first load, then cached by the browser.
*/

importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js');

let pyodide = null;

async function loadPyodideInstance() {
  if (pyodide) return pyodide;
  pyodide = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
  });
  return pyodide;
}

self.onmessage = async (event) => {
  const { id, userCode, tests } = event.data;

  const t0 = performance.now();

  try {
    const py = await loadPyodideInstance();

    // If no tests provided (freeform run / Step 1 & Step 2), execute user code directly & capture output
    if (!tests || tests.length === 0) {
      py.runPython(`
import sys
import io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
`);

      let error = null;
      try {
        py.runPython(userCode);
      } catch (e) {
        error = e.message || String(e);
      }

      const stdout = py.runPython('_stdout_capture.getvalue()');
      const stderr = py.runPython('_stderr_capture.getvalue()');

      py.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

      let globalStderr = stderr;
      if (error) globalStderr = (globalStderr ? globalStderr + '\n' : '') + error;

      const durationMs = Math.round(performance.now() - t0);
      self.postMessage({
        id,
        success: !error,
        result: {
          stdout: stdout.trim(),
          stderr: globalStderr.trim(),
          durationMs,
          testResults: [],
          allPassed: !error,
        },
      });
      return;
    }

    // Run test suite
    const testResults = [];
    let globalStdout = '';
    let globalStderr = '';

    for (const test of tests) {
      py.runPython(`
import sys
import io
_stdout_capture = io.StringIO()
_stderr_capture = io.StringIO()
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
`);

      let error = null;
      try {
        py.runPython(userCode + '\n' + test.testCode);
      } catch (e) {
        error = e.message || String(e);
      }

      const stdout = py.runPython('_stdout_capture.getvalue()').trim();
      const stderr = py.runPython('_stderr_capture.getvalue()').trim();

      py.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

      if (stdout) {
        globalStdout += (globalStdout ? '\n' : '') + stdout;
      }
      if (stderr) globalStderr += (globalStderr ? '\n' : '') + stderr;
      if (error) globalStderr += (globalStderr ? '\n' : '') + error;

      const passed = !error && stdout === test.expectedOutput.trim();
      testResults.push({
        description: test.description,
        passed,
        actualOutput: error ? `ERROR: ${error}` : stdout,
        expectedOutput: test.expectedOutput.trim(),
      });
    }

    const durationMs = Math.round(performance.now() - t0);
    const allPassed = testResults.every((r) => r.passed);

    self.postMessage({
      id,
      success: true,
      result: {
        stdout: globalStdout.trim(),
        stderr: globalStderr.trim(),
        durationMs,
        testResults,
        allPassed,
      },
    });
  } catch (e) {
    const durationMs = Math.round(performance.now() - t0);
    self.postMessage({
      id,
      success: false,
      result: {
        stdout: '',
        stderr: String(e),
        durationMs,
        testResults: [],
        allPassed: false,
        error: String(e),
      },
    });
  }
};
