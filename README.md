redis start commands 

docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest

docker ps  

CONTAINER ID   23456789

docker exec -it 5566dacde320 bash  

redis-cli ping