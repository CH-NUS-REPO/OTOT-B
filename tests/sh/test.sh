#!/bin/bash
docker-compose -f docker-compose.yaml -f docker-compose.test.yaml up -d
docker-compose -f docker-compose.yaml -f docker-compose.test.yaml exec web npm test
docker-compose -f docker-compose.yaml -f docker-compose.test.yaml down