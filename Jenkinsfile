pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'cp /var/jenkins_home/project_secrets/sysums.club/.env.local ./'
                sh 'docker build -t sysumsc/website:lastest .'
                sh 'docker-compose -f /var/docker-compose.yml up -d --build website'
            }
        }
    }
}
