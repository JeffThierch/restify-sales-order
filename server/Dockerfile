version: "3.2"
services:
  cipa_poll-dev-database:
    container_name: "cipa_poll-dev-database"
    image: bitnami/mariadb:10.7
    volumes:
      # CONFIGURATION FILE
      - ./.docker/database/my_custom.cnf:/opt/bitnami/mariadb/conf/my_custom.cnf
      # DATA MOUNTAAA
      - cipa_poll-db-dev-data:/bitnami/mariadb
    healthcheck:
      test: ["CMD", "/opt/bitnami/scripts/mariadb/healthcheck.sh"]
      interval: 15s
      timeout: 5s
      retries: 6
    restart: unless-stopped
    ports:
      - "3307:3306"
    env_file:
      - ./.env
    environment:
      # admin access
      - MARIADB_ROOT_PASSWORD=${DB_ROOT_PASSWORD}
      # application access
      - MARIADB_DATABASE=${DB_DATABASE}
      - MARIADB_USER=${DB_USER}
      - MARIADB_PASSWORD=${DB_PASSWORD}
    networks:
      - default
networks:
  default:
    driver: bridge

volumes:
  cipa_poll-db-dev-data:
    name: cipa_poll-db-dev-data
