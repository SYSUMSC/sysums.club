pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t sysumsc/website:lastest .'
                sh 'docker-compose -f /var/docker-compose.yml up -d --build website'
            }
        }
    }
}
