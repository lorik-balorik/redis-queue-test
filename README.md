This is a solution for the second test assignment.

To execute the program do the following steps :
1) run `docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest`
2) to see the queue processing in dashboard you can open in a browser `localhost:8001` and then go to `Browser`
3) run `npm install` 
4) type in console `npm run feedData`; - this will send (input) a contact data queue to Redis
5) type in console `npm run process`; - this will hydrate and output data into console
