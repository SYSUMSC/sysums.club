pipeline {
    agent any
    environment {
        WP_USERNAME = credentials('/var/jenkins_home/workspace/sysums.club.secret/wp_username.txt')
        WP_USER_PASSWORD = credentials('/var/jenkins_home/workspace/sysums.club.secret/wp_password.txt')
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t sysumsc/website:lastest .'
                sh 'docker-compose -f /var/docker-compose.yml up -d --build website'
            }
        }
    }
}
