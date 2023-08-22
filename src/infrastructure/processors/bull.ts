import { Job, DoneCallback } from "bull";

export default function (job: Job, callBack: DoneCallback) {
  console.info(`[${process.pid}] ${JSON.stringify(job.data)}`);
  callBack(null, "Jobs Ativo");
}
