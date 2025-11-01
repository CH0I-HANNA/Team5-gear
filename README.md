# Team5 Gear — Monorepo (Spring Boot + Next.js)

엔드투엔드 장비 커뮤니티/콘텐츠 앱. 백엔드는 Spring Boot 3 + JPA + JWT + MySQL, 프런트는 Next.js(Typescript, Tailwind)를 사용합니다.

## 주요 기능
- 회원가입/로그인(JWT)
- 마이페이지(정보/즐겨찾기/리뷰)
- 카테고리/기사/검색
- 댓글 작성/조회

## 기술 스택
- Backend: Java 17, Spring Boot 3.x, Spring Security, JPA(Hibernate), JJWT, MySQL
- Frontend: Next.js(React), Typescript, TailwindCSS
- Build: Gradle, npm

## 저장소 구조
```
root/
├─ src/main/java/com/team5/gear          # Spring Boot 소스
├─ src/main/resources                    # Spring 설정/리소스
├─ frontend/                             # Next.js 앱
├─ build.gradle, settings.gradle         # Gradle 설정
├─ .env.example                          # 로컬 개발용 환경변수 예시(커밋 금지: .env)
└─ README.md
```

## 빠른 시작 (로컬 개발)
아래는 Windows PowerShell 기준입니다.

### 1) 사전 요구사항
- JDK 17+
- Node.js LTS (>=18 권장)
- MySQL 8.x (로컬 설치 또는 Docker)

### 2) 환경변수 준비
백엔드는 `src/main/resources/application.yml`에서 환경변수를 읽습니다.
- 필수: `DB_PASSWORD`, `JWT_SECRET(Base64)`, 선택: `DB_USERNAME`(기본 root), `JWT_EXPIRATION`(기본 3600000)
- `.env.example`를 참고해 `.env`를 만들고 값 채운 뒤, 현재 PowerShell 세션에 로드하세요(아래 예시 스크립트). `.env`는 깃에 커밋되지 않습니다.

`.env` 예시
```
DB_USERNAME=root
DB_PASSWORD=your_local_db_password
JWT_SECRET=Base64EncodedRandom32Bytes==
JWT_EXPIRATION=3600000
```

개발용 Base64 시크릿 생성 (32바이트)
```powershell
$bytes = New-Object byte[] 32; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

`.env` 로드(현재 세션에 환경변수 적용)
```powershell
Get-Content .env | ForEach-Object {
  if ($_ -and -not $_.StartsWith('#')) {
    $parts = $_ -split '=', 2
    if ($parts.Length -eq 2) { Set-Item -Path Env:\$($parts[0].Trim()) -Value $parts[1].Trim() }
  }
}
```

### 3) 데이터베이스 준비
로컬 MySQL을 쓰거나 Docker로 실행하세요.

Docker (권장, 포트 3306)
```powershell
docker run --name gear-mysql -e MYSQL_ROOT_PASSWORD=your_root_password -e MYSQL_DATABASE=gear -p 3306:3306 -d mysql:8.0
```

직접 MySQL에 DB 생성
```sql
CREATE DATABASE gear CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4) 백엔드 실행 (기본 8080)
```powershell
.\gradlew.bat bootRun
```
- 포트 변경 원하면 세션에서 설정: ` $env:SERVER_PORT="9090" `
- 주요 엔드포인트
  - POST http://localhost:8080/api/auth/register
  - POST http://localhost:8080/api/auth/login
  - GET  http://localhost:8080/api/user/me (Authorization: Bearer <token>)

### 5) 프런트엔드 실행 (3000)
```powershell
cd frontend
npm install
npm run dev
# http://localhost:3000 접속
```
- 현재 프런트는 `frontend/lib/auth.ts`에 백엔드 API를 `http://localhost:8080`으로 하드코딩하고 있습니다.
- 운영/환경 분리를 위해 `NEXT_PUBLIC_API_BASE` 환경변수 도입을 추후 권장합니다.

## 설정 상세
### Spring Boot (`src/main/resources/application.yml`)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/gear?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    username: ${DB_USERNAME:root}
    password: ${DB_PASSWORD:}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect
jwt:
  secret: ${JWT_SECRET:}        # Base64 인코딩 필수
  expiration: ${JWT_EXPIRATION:3600000}
```

### 보안/인증
- 로그인: `AuthenticationManager` 인증 성공 후 `JwtTokenProvider.generateToken(email)`로 JWT 발급
- 요청 검증: `JwtAuthenticationFilter`가 Authorization Bearer 토큰 파싱·검증 후 `SecurityContext`에 주입
- CORS: 기본 허용(개발 편의). 운영 시 도메인 화이트리스트로 제한 권장

## API 사용 예시
로그인
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"hana@example.com","password":"1234"}'
```
응답의 `token`으로 사용자 정보 조회
```bash
curl http://localhost:8080/api/user/me -H "Authorization: Bearer <TOKEN>"
```

