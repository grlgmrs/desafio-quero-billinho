#!/bin/bash

docker-compose -f docker-compose.e2e.yaml up --abort-on-container-exit --exit-code-from app