import Bull from "bull";

const defaultContactData = [
    {
        "source": "MySender",
        "destination": "39340123456",
        "text": "some random lorem ipsum"
    },
    {
        "source": "39340000000",
        "destination": "40340123456",
        "text": "some random lorem ipsum"
    },
    {
        "source": "My_S3nder",
        "destination": "44340000000",
        "text": "some random lorem ipsum"
    }
];

const myQueue = new Bull('my-queue');

const feedSourceQueue = async () => {
    for(const c of defaultContactData) {
        await myQueue.add(c);
    }
}

feedSourceQueue().then(() => {
    console.log('queue sent');

    myQueue.close();
});



