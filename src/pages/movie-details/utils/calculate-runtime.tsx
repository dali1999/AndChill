export const claculateRuntime = (runtime: number | undefined) => {
  if (runtime) {
    const hour = Math.floor(runtime / 60);
    const min = runtime % 60;
    return [hour, min];
  }
};
