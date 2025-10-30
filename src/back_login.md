# backend_login.md

AI Development Guide for Team5 (SeoulTech Hackathon)

## 기능 모듈: 로그인 / 로그아웃 / 회원가입

### 목표

Spring Boot + JPA 기반 사용자 인증 시스템을 구축한다. 세션 대신 JWT(Json Web Token)를 사용해 로그인 상태를 유지한다.

## 주요 요구사항

| 기능        | 설명                    | 엔드포인트                   | 인증 필요 |
| --------- | --------------------- | ----------------------- | ----- |
| 회원가입      | 신규 사용자 등록             | POST /api/auth/register | 아니오   |
| 로그인       | JWT 토큰 발급             | POST /api/auth/login    | 아니오   |
| 로그아웃      | 클라이언트 측 토큰 삭제(서버 미관리) | POST /api/auth/logout   | 예     |
| 사용자 정보 조회 | JWT 검증 후 사용자 데이터 반환   | GET /api/user/me        | 예     |

참고: 로그아웃은 서버 세션을 사용하지 않으므로, 클라이언트가 저장한 토큰을 삭제하는 방식으로 처리한다.

## 기술 스택 및 구성

* Framework: Spring Boot 3.x
* Database: MySQL (JPA + Hibernate)
* Authentication: JWT 기반
* Password 암호화: Spring Security BCryptPasswordEncoder
* Build Tool: Gradle

## 패키지 구조 예시

```
com.example.gear
 ┣ controller
 ┃ ┗ AuthController.java
 ┣ entity
 ┃ ┗ User.java
 ┣ repository
 ┃ ┗ UserRepository.java
 ┣ service
 ┃ ┗ AuthService.java
 ┣ security
 ┃ ┣ JwtTokenProvider.java
 ┃ ┗ JwtAuthenticationFilter.java
 ┗ GearApplication.java
```

## Entity: User.java

```java
@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private LocalDateTime createdAt = LocalDateTime.now();
}
```

## JWT 설정 요약

* Access Token만 사용 (유효기간: 1시간)
* HTTP Header: Authorization: Bearer <token>
* 비밀키는 환경설정에 저장한다 (예: application.yml 또는 .env)

application.yml 예시

```yaml
jwt:
  secret: your_jwt_secret_key_here
  expiration: 3600000   # millisecond, 1 hour
```

## API 명세

### 회원가입

* 메서드: POST
* 경로: /api/auth/register
* Request body 예시

```json
{
  "username": "hana",
  "email": "hana@example.com",
  "password": "1234"
}
```

* Response 예시

```json
{
  "message": "회원가입이 완료되었습니다."
}
```

### 로그인

* 메서드: POST
* 경로: /api/auth/login
* Request body 예시

```json
{
  "email": "hana@example.com",
  "password": "1234"
}
```

* Response 예시

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 로그아웃

* 메서드: POST
* 경로: /api/auth/logout
* 동작: 클라이언트가 보관 중인 JWT를 삭제한다. 서버는 별도 세션을 관리하지 않는다. 서버 사이드 블랙리스트는 본 버전에서 관리하지 않는다.

### 사용자 정보 조회

* 메서드: GET
* 경로: /api/user/me
* 헤더

```
Authorization: Bearer <JWT token>
```

* Response 예시

```json
{
  "id": 1,
  "username": "hana",
  "email": "hana@example.com"
}
```

## 애플리케이션 설정 가이드

application.yml 예시

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/gear?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect
```

build.gradle 예시

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
    runtimeOnly 'mysql:mysql-connector-j:8.4.0'
}
```

## 구현 체크리스트

1. User Entity 생성
2. UserRepository 생성 (JpaRepository<User, Long>)
3. AuthService 구현

    * 회원가입: 이메일과 사용자명 중복 검사 → 비밀번호 해시 저장(BCrypt)
    * 로그인: 이메일로 사용자 조회 → 비밀번호 검증 → JWT 생성 반환
4. JWT 유틸리티

    * JwtTokenProvider: 토큰 생성, 파싱, 유효성 검증
    * SecretKey와 만료시간을 환경설정에서 주입받음
5. 보안 필터

    * JwtAuthenticationFilter: Authorization 헤더에서 토큰 추출 → 검증 → SecurityContext에 인증 주입
6. 컨트롤러 연결

    * AuthController: /register, /login, /logout
    * UserController: /user/me
7. 테스트

    * Postman 또는 Swagger로 회원가입 → 로그인 → me 순서 확인

## 요청 및 응답 상세 규약

회원가입 실패 케이스

* 409 Conflict: 이미 존재하는 이메일 또는 사용자명
* 400 Bad Request: 잘못된 입력값

로그인 실패 케이스

* 401 Unauthorized: 이메일 또는 비밀번호 불일치

보호된 리소스 접근 실패

* 401 Unauthorized: 토큰 없음 또는 만료
* 403 Forbidden: 권한 없음

## 예외 메시지 포맷 권장

```json
{
  "timestamp": "2025-10-30T01:23:45Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "토큰이 유효하지 않습니다.",
  "path": "/api/user/me"
}
```

## 확장 아이디어

* Refresh Token 도입 및 재발급 엔드포인트 추가

[//]: # (* 소셜 로그인&#40;OAuth2: Google, Kakao&#41;)
* 이메일 인증(회원가입 완료 전 활성화)
* 로그인 실패 횟수 제한 및 딜레이
* 서버 사이드 토큰 블랙리스트(로그아웃 무효화) 도입
