import { useRef, useCallback, useState } from 'react';
import type { RunResult, TestCase } from '../shared/types';

type WorkerStatus = 'idle' | 'loading' | 'running' | 'ready';

export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<string, { resolve: (r: RunResult) => void; reject: (e: Error) => void }>>(new Map());
  const [status, setStatus] = useState<WorkerStatus>('idle');

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      setStatus('loading');
      const worker = new Worker('/pyodide-worker.js');
      worker.onmessage = (event) => {
        const { id, success, result } = event.data as {
          id: string;
          success: boolean;
          result: RunResult;
        };
        const pending = pendingRef.current.get(id);
        if (pending) {
          pendingRef.current.delete(id);
          if (success) {
            pending.resolve(result);
          } else {
            pending.resolve(result); // still resolve, error is inside result
          }
        }
        if (pendingRef.current.size === 0) {
          setStatus('ready');
        }
      };
      worker.onerror = (event) => {
        console.error('Worker error:', event);
        setStatus('ready');
      };
      workerRef.current = worker;
    }
    return workerRef.current;
  }, []);

  const runCode = useCallback(
    (userCode: string, tests: TestCase[]): Promise<RunResult> => {
      return new Promise((resolve, reject) => {
        const worker = getWorker();
        const id = crypto.randomUUID();
        pendingRef.current.set(id, { resolve, reject });
        setStatus('running');
        worker.postMessage({ id, userCode, tests });
      });
    },
    [getWorker]
  );

  return { runCode, status };
}
