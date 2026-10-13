/** Frame-based timing. No wall clock or random state. */
export function loopPhase(frame, fps, seconds) {
  if (![frame, fps, seconds].every(Number.isFinite) || fps <= 0 || seconds <= 0)
    throw new RangeError("Finite frame, positive fps and positive seconds required");
  const period = fps * seconds;
  if (!Number.isFinite(period) || period <= 0) throw new RangeError("Invalid period");
  return (((frame % period) + period) % period) / period * Math.PI * 2;
}

/** A shared smooth wave for multiple coordinated objects. */
export function loopWave(phase) {
  if (!Number.isFinite(phase)) throw new RangeError("Finite phase required");
  return 0.85 * Math.sin(phase) + 0.15 * Math.sin(2 * phase);
}
