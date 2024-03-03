Create a nodejs process which read from a "input" redis queue, elaborates the data and push the result in a "output" redis queue.

Inside the "input" queue will be pushed these JSON objects (queue order doesn't matter)

    {
      "source": "MySender",
      "destination": "39340123456",
      "text": "some random lorem ipsum"
    }
    {
      "source": "39340000000",
      "destination": "40340123456",
      "text": "some random lorem ipsum"
    }
    {
      "source": "My_S3nder",
      "destination": "44340000000",
      "text": "some random lorem ipsum"
    }

The "output" queue will contain (queue order doesn't matter)

    {
      "id": "random alphanumeric string 1",
      "source": "MySender",
      "sourceType": "alphanumeric",
      "destination": "39340123456",
      "destinationCountry": "italy",
      "text": "some random lorem ipsum"
    }
    {
      "id": "random alphanumeric string 2",
      "source": "39340000000",
      "sourceType": "numeric",
      "destination": "40340123456",
      "destinationCountry": "romania",
      "text": "some random lorem ipsum"
    }
    {
      "id": "random alphanumeric string 3",
      "source": "My_S3nder",
      "sourceType": "alphanumeric",
      "destination": "44340000000",
      "destinationCountry": "united kingdom",
      "text": "some random lorem ipsum"
    }

id generation: just a random id

sourceType calculation: if source is only digits "numeric" else "alphanumeric"

destinationCountry calculation: using a mapping
Let's assume that only the first 2 digits of the destination are used in the mapping

    {
      "39": "italy",
      "40": "romania",
      "41": "switzerland",
      "43": "austria",
      "44": "united kingdom",
    }

Test checks
- folder, file, classes, function design and organization
- start a standard redis docker container (127.0.0.1:6379)
- run `node feedSourceQueue.js` a script for populating the 3 elements in the "input" queue
- run `node process.js` and wait a bunch of seconds
- the process should keep working forever, untill manually stopped he must try to read from the input
- check in the redis the "output" queue for the correct 3 elements

Nice to have: some sort of error handling to avoid making the process stop

Difficult, non mandatory point: the process should start multiple async queue handler, example in pseudocode

    for i=0 until i=number of concurrent queue handler
      queueHandler()

    function queuequeueHandler() {
      read from redis
      do calculations
      push in output redis
      start again
    }