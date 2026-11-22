# Angular Production-Ready Template (`angular_template`)

Bộ khung khởi tạo dự án Angular hiện đại, chuẩn Production-ready được tối ưu cho cả phát triển độc lập (Solo) lẫn làm việc nhóm (Team).

---

## Công nghệ & Phiên bản Thực tế

- **Angular Core & CLI:** `v22.3.0` (Zoneless Change Detection, Standalone Components, Modern Control Flow, Signals State)
- **TypeScript:** `~6.0.2` (Bật strict mode toàn diện, cấu hình Path Aliases trực tiếp)
- **Styling:** Tailwind CSS `v4.3.5` tích hợp qua `@tailwindcss/postcss` & `postcss`
- **Biểu tượng & Giao diện:** `@lucide/angular` / `lucide-angular`, `clsx`, `tailwind-merge`
- **Validation:** `zod` (`v4.6.7`) xác thực biến môi trường runtime và domain data schemas
- **Code Linter:** `eslint` (`v9+`), `angular-eslint` (`v22.8.0`), `eslint-config-prettier`
- **Code Formatter:** `prettier` (`v3.10.1`), `prettier-plugin-tailwindcss`
- **Git Hooks:** `husky` (`v9.1.7`), `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`

---

## Yêu cầu Hệ thống

- **Node.js:** `>= 22.0.0` (Khuyến nghị đồng bộ theo file `.nvmrc`)
- **Package Manager:** `npm >= 11.0.0`
- **VS Code Extensions khuyến nghị:**
  - Angular Language Service (`angular.ng-template`)
  - ESLint (`dbaeumer.vscode-eslint`)
  - Prettier - Code formatter (`esbenp.prettier-vscode`)
  - Tailwind CSS IntelliSense (`bradlc.vscode-tailwindcss`)

---

## Hướng dẫn Khởi động Nhanh (Quick Start)

1. Clone kho lưu trữ:

   ```bash
   git clone <repository-url>
   cd angular_template
   ```

2. Tạo file cấu hình môi trường:

   ```bash
   cp .env.example .env
   ```

3. Cài đặt các gói phụ thuộc:

   ```bash
   npm install
   ```

4. Khởi chạy Development Server:

   ```bash
   npm run dev
   ```

5. Mở trình duyệt và truy cập: `http://localhost:5000`

---

## Biến Môi trường (.env)

Cấu hình dự án được kiểm soát qua file `.env` ở thư mục gốc (được `.gitignore` bảo vệ, khởi tạo từ `.env.example`):

- `NG_PORT`: Cổng lắng nghe của Angular Dev Server (mặc định: `5000`).
- `NG_API_BASE_URL`: Địa chỉ API Backend (mặc định: `http://localhost:8000/api`), được `scripts/sync-env.mjs` tự động đồng bộ vào `src/environments/environment.ts` và `src/environments/environment.development.ts` trước mỗi lần dev hoặc build.

---

## Cấu trúc Thư mục Dự án

```plaintext
src/
├── app/
│   ├── core/                         # Singleton services, guards, interceptors, env config
│   │   ├── config/
│   │   │   └── env.ts                # Validate biến môi trường bằng Zod schema
│   │   ├── guards/
│   │   │   └── auth.guard.ts         # Functional route guard mẫu (CanActivateFn)
│   │   └── interceptors/
│   │       └── api.interceptor.ts    # Functional HTTP interceptor gắn baseUrl & token
│   ├── features/                     # Phân chia theo module nghiệp vụ (độc lập cho từng dev/team)
│   │   └── example/
│   │       ├── components/           # Components giao diện nội bộ của feature
│   │       ├── models/               # TypeScript interfaces và types riêng của feature
│   │       ├── schemas/              # Zod validation schemas
│   │       ├── services/             # Quản lý state bằng Signals và logic API
│   │       ├── example.component.ts  # Trang giao diện chính của feature
│   │       └── example.routes.ts     # Route con lazy-loaded của feature
│   ├── layouts/
│   │   └── main-layout.component.ts  # Shell layout khung giao diện chứa <router-outlet />
│   ├── shared/                       # Thành phần dùng chung toàn ứng dụng
│   │   ├── components/               # UI components dùng chung (Button, Input, Modal...)
│   │   ├── directives/               # Directives tùy biến dùng chung
│   │   ├── pipes/                    # Pipes tùy biến dùng chung
│   │   └── utils/
│   │       └── cn.ts                 # Helper gộp class Tailwind (clsx + tailwind-merge)
│   ├── app.config.ts                 # Cấu hình Providers toàn app (Zoneless, Router, HttpClient)
│   ├── app.html                      # Root template tối giản (<router-outlet />)
│   ├── app.routes.ts                 # Định tuyến gốc (Lazy loading module và fallback 404)
│   └── app.ts                        # Root AppComponent
├── environments/                     # Tự động sinh bởi scripts/sync-env.mjs
│   ├── environment.development.ts
│   └── environment.ts
├── main.ts                           # Điểm khởi chạy ứng dụng
└── styles.css                        # Global CSS & chỉ thị nạp Tailwind CSS v4
```

### Nguyên tắc Phân chia Code

- **`src/app/core/`**: Chứa các service bắt buộc là Singleton, Functional HTTP Interceptors, Functional Route Guards, và cấu hình biến môi trường có Zod validation. Tuyệt đối không chứa UI components.
- **`src/app/features/`**: Chứa toàn bộ nghiệp vụ domain logic. Mỗi folder tương ứng một feature độc lập có route, component, signal state và schema riêng, giúp giảm thiểu xung đột git giữa các thành viên.
- **`src/app/layouts/`**: Chứa khung hiển thị vỏ ngoài ứng dụng (Header, Sidebar, Footer) bao bọc thẻ `<router-outlet />`.
- **`src/app/shared/`**: Chứa các thành phần UI thuần túy (dumb components), pipes, directives, và tiện ích hỗ trợ dùng chung trên nhiều feature, không chứa logic nghiệp vụ đặc thù.

---

## Cấu hình Path Aliases

Đường dẫn nội bộ được cấu hình trực tiếp trong `tsconfig.json` (không phụ thuộc thuộc tính `baseUrl` đã deprecated):

- `@/*` trỏ tới `src/app/*`
- `@env/*` trỏ tới `src/environments/*`

---

## Danh sách NPM Scripts

- `npm run dev`: Chạy `scripts/dev.mjs` (đồng bộ `.env` và khởi chạy dev server trên `NG_PORT`, mặc định 5000).
- `npm start`: Tương đương `npm run dev`.
- `npm run build`: Chạy `scripts/sync-env.mjs` và đóng gói production qua `ng build`.
- `npm run type-check`: Kiểm tra kiểu tĩnh toàn bộ mã nguồn qua TypeScript Compiler (`tsc --noEmit`).
- `npm run lint`: Kiểm tra quy chuẩn mã nguồn cho file `.ts` và `.html` qua Angular ESLint (`ng lint`).
- `npm run format`: Tự động định dạng mã nguồn toàn dự án qua Prettier (`prettier --write .`).
- `npm test`: Chạy unit test dự án qua Vitest (`ng test`).

---

## Quy ước Git Commit

Dự án bắt buộc tuân thủ chuẩn [Conventional Commits](https://www.conventionalcommits.org/) được kiểm soát tự động qua Husky và Commitlint:

```bash
git commit -m "feat(auth): thêm interceptor tự động refresh token"
git commit -m "fix(router): sửa lỗi lặp chuyển hướng trang 404"
```

Các tiền tố hợp lệ: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
