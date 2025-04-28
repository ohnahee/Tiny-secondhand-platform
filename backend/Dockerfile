# Node.js 20 버전 사용 (alpine은 가볍지만 개발 때는 full image 추천)
FROM node:20

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 나머지 소스 코드 복사
COPY . .

# 사용할 포트 명시 (3001로 수정)
EXPOSE 3001

# 서버 실행
CMD ["npm", "start"]
