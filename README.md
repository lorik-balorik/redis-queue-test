This is a solution for the second test assignment.

To execute the program do the following steps :
    1) run docker file which doesn't exist for now
        1.1) to see the queue processing in dashboard you can open in a browser `localhost:8001` and then go to `Browser`
    2) type in console `npm run feedData`; - this will send (input) a contact data queue to Redis
    3) type in console `npm run process`; - this will hydrate and output data into console
