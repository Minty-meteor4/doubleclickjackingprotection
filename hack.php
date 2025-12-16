<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>CloudDesk • Управление доступом</title>
    <style>
        :root {
            --bg: #eef2f7;
            --card: #ffffff;
            --border: #e2e8f0;
            --text: #1f2937;
            --muted: #4b5563;
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --success: #16a34a;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: "Arial", sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #dfe7f3 50%, #eef2f7 100%);
            color: var(--text);
        }
        header {
            background: #0f172a;
            color: #e5e7eb;
            padding: 14px 22px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }
        .brand {
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .status {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255,255,255,0.08);
            padding: 6px 10px;
            border-radius: 12px;
            font-size: 12px;
        }
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #22c55e;
        }
        .container {
            max-width: 1024px;
            margin: 32px auto;
            padding: 0 20px 60px;
        }
        .card {
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 24px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
        }
        .section-title {
            margin: 0;
            font-size: 14px;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            color: var(--muted);
        }
        h1 {
            margin: 6px 0 12px;
            font-size: 26px;
        }
        .lead {
            margin: 0 0 18px;
            color: var(--muted);
            line-height: 1.5;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 14px;
            margin: 12px 0 18px;
        }
        .field {
            padding: 10px 12px;
            border: 1px solid var(--border);
            border-radius: 12px;
            background: #f8fafc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--muted);
            font-size: 14px;
        }
        .field strong {
            color: var(--text);
            font-size: 15px;
        }
        .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(37, 99, 235, 0.1);
            color: var(--primary);
            font-weight: 600;
            font-size: 14px;
        }
        .alert {
            background: #fff7ed;
            border: 1px solid #fed7aa;
            color: #9a3412;
            padding: 12px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            margin: 6px 0 14px;
        }
        .actions {
            margin-top: 18px;
            position: relative;
            min-height: 50px;
        }
        .btn-primary {
            position: fixed;
            top: 250px;
            left: 400px;
            width: 150px;
            height: 30px;
            border: none;
            border-radius: 999px;
            background: linear-gradient(90deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: #ffffff;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 12px 24px rgba(37, 99, 235, 0.28);
            transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.2s ease;
        }
        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 14px 26px rgba(37, 99, 235, 0.32);
        }
        .btn-primary:active {
            transform: translateY(0);
            box-shadow: 0 10px 18px rgba(37, 99, 235, 0.26);
        }
        .success {
            border-left: 4px solid var(--success);
        }
        .tags {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin: 10px 0;
        }
        .tag {
            background: rgba(22, 163, 74, 0.12);
            color: var(--success);
            padding: 6px 10px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 600;
        }
        .link {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }
        footer {
            text-align: center;
            color: var(--muted);
            font-size: 13px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <header>
        <div class="brand">CloudDesk</div>
        <div class="status"><span class="dot"></span> Среда продакшн • SLA 99.9%</div>
    </header>
    <div class="container">
        <?php if (!isset($_GET["emailValid"])) { ?>
        <div class="card">
            <p class="section-title">Управление доступом</p>
            <h1>Приглашение администратора</h1>
            <p class="lead">Вы собираетесь добавить нового администратора в рабочее пространство. Проверьте данные и подтвердите.</p>

            <div class="grid">
                <div class="field">
                    <span>Email</span>
                    <strong><?= htmlspecialchars($_GET["user"] ?? "new.admin@example.com", ENT_QUOTES, 'UTF-8'); ?></strong>
                </div>
                <div class="field">
                    <span>Роль</span>
                    <span class="pill">Администратор</span>
                </div>
                <div class="field">
                    <span>Права</span>
                    <strong>Все проекты (12)</strong>
                </div>
                <div class="field">
                    <span>Безопасность</span>
                    <strong>2FA обязательно</strong>
                </div>
            </div>

            <div class="alert">
                После подтверждения пользователь получит письмо-приглашение и мгновенный доступ ко всем проектам.
                Убедитесь, что адрес указан верно.
            </div>

            <form>
                <input type="hidden" name="emailValid" value="<?= htmlspecialchars($_GET["user"] ?? "new.admin@example.com", ENT_QUOTES, 'UTF-8'); ?>">
                <div class="actions">
                    <input type="submit" value="Подтвердить доступ" class="btn-primary" />
                </div>
            </form>
        </div>
        <?php } else { ?>
        <div class="card success">
            <p class="section-title">Управление доступом</p>
            <h1>Доступ обновлён</h1>
            <p class="lead">Пользователь <?= htmlspecialchars($_GET["emailValid"], ENT_QUOTES, 'UTF-8'); ?> назначен администратором.</p>
            <div class="tags">
                <span class="tag">Роль: Admin</span>
                <span class="tag">Доступ: Все проекты</span>
                <span class="tag">Уведомление отправлено</span>
            </div>
            <a class="link" href="poc.html">Вернуться к демонстрации</a>
        </div>
        <?php } ?>
        <footer>CloudDesk © 2025 • Платформа управления доступом</footer>
    </div>
</body>
</html>
