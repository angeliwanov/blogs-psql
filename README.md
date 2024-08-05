#Create psql db
fly launch

#Enter psql
flyctl postgres connect -a psql-db-123

#Establish connection with fly server
flyctl proxy 5432 -a psql-db-123
