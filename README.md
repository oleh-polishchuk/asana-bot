# asana-bot
App will sync asana tasks according to github pull-requests action

# Asana

## Update Task

To update task, make request:

    curl -d '{"taskId":"value1", "projectId":"value2", "sectionId":"value3"}' -H "Authorization: Bearer applicaiton-token" -H "Content-Type: application/json" -X POST https://ecb4631f.ngrok.io/task/:taskId/move 
