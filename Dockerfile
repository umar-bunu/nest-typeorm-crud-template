FROM postgres:14.9-alpine

# Add custom configurations if needed
COPY ./custom-config/* /docker-entrypoint-initdb.d/
