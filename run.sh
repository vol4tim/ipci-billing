#!/bin/bash

env >> /tmp/.env
cat /tmp/.env >> /etc/cron.d/ipci-cron
echo -n "$TASK_SCHEDULE" | cat - /tmp/crontab >> /etc/cron.d/ipci-cron
cron && tail -f /var/log/cron.log
