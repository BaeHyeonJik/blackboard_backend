
# KWEB 정회원 과제 설명

## 1. 의존성 파일 설치
```bash
npm ci
```

## 2. DB Schema name : blackboard

```sql
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(45) NOT NULL,
    password VARCHAR(100) NOT NULL,
    name VARCHAR(10) NOT NULL,
    num VARCHAR(10) NOT NULL,
    role VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE lectures (
    id INT NOT NULL AUTO_INCREMENT,
    prof_id INT NOT NULL,
    title VARCHAR(45) NOT NULL,
    limitednum INT,
    credit INT,
    PRIMARY KEY (id),
    FOREIGN KEY (prof_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE registers (
    id INT NOT NULL AUTO_INCREMENT,
    lecture_id INT NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (lecture_id) REFERENCES lectures(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE boards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prof_id INT NOT NULL,
    lecture_id INT NOT NULL,
    post_title TEXT NOT NULL,
    content LONGTEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prof_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (lecture_id) REFERENCES lectures(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## 3. .env 파일(루트 디렉토리에 생성)
(DB 생성 후 값을 넣어주면 됩니다!)
```
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_NAME=
DATABASE_HOST=
DATABASE_PORT =
```

## 4. 실행 명령어
```bash
node app.js
```
