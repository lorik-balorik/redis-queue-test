import Bull from "bull";
import {v4} from "uuid";

const countryCodes = {
    "39": "italy",
    "40": "romania",
    "41": "switzerland",
    "43": "austria",
    "44": "united kingdom",
};
const hydrateData = (data) => {

    return {
        ...data,
        destinationCountry: countryCodes[data.destination.substring(0, 2)],
        sourceType: data.source.match(/^\d+$/) ? "numeric" : "alphanumeric",
        id: v4()
    };
}

setTimeout(async () => {
    for (let i = 0; i < 3; i++) {
        let myQueue = new Bull('my-queue', {
            limiter: {
                max: 1000,
                duration: 5000
            }
        });
        myQueue.process(async (job, done) => {
            try{
                console.log(hydrateData(job.data), `handled by: ${i}`);

                done();
            } catch (e) {
                console.error(e)
                throw e;
            }
        });
    }

}, 3000);

