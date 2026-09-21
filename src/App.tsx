import { useState } from 'react';

type Section = 'overview' | 'roles' | 'screens' | 'data-flow' | 'storage' | 'business' | 'architecture' | 'notifications';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview');

  const sections: { id: Section; label: string; icon: string }[] = [
    { id: 'overview', label: 'Обзор системы', icon: '📋' },
    { id: 'roles', label: 'Роли и права', icon: '👥' },
    { id: 'screens', label: 'Экраны', icon: '📱' },
    { id: 'data-flow', label: 'Потоки данных', icon: '🔄' },
    { id: 'storage', label: 'Хранение данных', icon: '📊' },
    { id: 'business', label: 'Бизнес-правила', icon: '⚙️' },
    { id: 'notifications', label: 'Уведомления', icon: '🔔' },
    { id: 'architecture', label: 'Архитектура', icon: '🏗️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">💊 Учёт лекарственных средств</h1>
          <p className="text-blue-200 mt-1">Выездное медицинское подразделение — Концепция приложения</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <nav className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 lg:sticky lg:top-6">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center gap-3 transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="text-xl">{section.icon}</span>
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'roles' && <RolesSection />}
          {activeSection === 'screens' && <ScreensSection />}
          {activeSection === 'data-flow' && <DataFlowSection />}
          {activeSection === 'storage' && <StorageSection />}
          {activeSection === 'business' && <BusinessSection />}
          {activeSection === 'notifications' && <NotificationsSection />}
          {activeSection === 'architecture' && <ArchitectureSection />}
        </main>
      </div>
    </div>
  );
}

function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Обзор системы</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Система учёта лекарственных средств, оборудования и расходных материалов для выездного медицинского подразделения. 
          Предназначена для контроля прихода, расхода и остатков с привязкой к сотрудникам и пациентам.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <div className="text-3xl mb-2">👨‍💼</div>
            <h3 className="font-semibold text-blue-800">Руководитель</h3>
            <p className="text-sm text-blue-600 mt-1">1 пользователь (ПК)</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="text-3xl mb-2">📦</div>
            <h3 className="font-semibold text-green-800">Кладовщик</h3>
            <p className="text-sm text-green-600 mt-1">1 пользователь (ПК)</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="text-3xl mb-2">👨‍⚕️</div>
            <h3 className="font-semibold text-purple-800">Сотрудники</h3>
            <p className="text-sm text-purple-600 mt-1">30 пользователей (PWA)</p>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <h3 className="font-semibold text-amber-800 mb-2">🎯 Ключевые цели</h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2"><span>✓</span> Контроль расхода лекарств на каждого пациента</li>
            <li className="flex items-start gap-2"><span>✓</span> Финансовый учёт прихода/расхода/остатков</li>
            <li className="flex items-start gap-2"><span>✓</span> Офлайн-работа с синхронизацией (до 72 часов)</li>
            <li className="flex items-start gap-2"><span>✓</span> Автоматические уведомления о перерасходе</li>
            <li className="flex items-start gap-2"><span>✓</span> Ежемесячные отчёты (PDF/Excel)</li>
            <li className="flex items-start gap-2"><span>✓</span> Версионность и журнал изменений</li>
            <li className="flex items-start gap-2"><span>✓</span> Хранение данных в Google Sheets</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📐 Масштаб системы</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Сотрудников" value="30" color="purple" />
          <StatCard label="Номенклатура" value="~200" subtitle="позиций" color="blue" />
          <StatCard label="Пациентов/мес" value="~500" subtitle="вызовов" color="green" />
          <StatCard label="Операций/день" value="~150" subtitle="записей" color="amber" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🔑 Ключевые сущности</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <EntityCard name="Сотрудник" fields={['ФИО', 'Персональный номер', 'Пароль', 'Статус', 'Должность']} />
          <EntityCard name="Номенклатура" fields={['Название', 'Категория', 'Ед. измерения', 'Цена', 'Дата изменения цены']} />
          <EntityCard name="Пациент" fields={['ФИО', 'Дата рождения', 'Дата вызова', 'Сотрудник']} />
          <EntityCard name="Расход" fields={['Сотрудник', 'Пациент', 'Номенклатура', 'Количество', 'Дата']} />
          <EntityCard name="Приход" fields={['Сотрудник', 'Сумма (₽)', 'Период', 'Кол-во смен']} />
          <EntityCard name="Возврат" fields={['Сотрудник', 'Номенклатура', 'Количество', 'Дата', 'Кем скорректирован']} />
        </div>
      </div>
    </div>
  );
}

function RolesSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Роли и права доступа</h2>
        
        {/* Руководитель */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">👨‍💼</div>
            <div>
              <h3 className="text-xl font-bold text-blue-800">Руководитель выездного подразделения</h3>
              <p className="text-sm text-gray-500">Платформа: ПК (веб-приложение)</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 mb-2">✅ Может:</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>• Вносить названия лекарств и оборудования</li>
                <li>• Устанавливать цены на номенклатуру</li>
                <li>• Проставлять количество смен</li>
                <li>• Проставлять приход (₽) на каждого сотрудника</li>
                <li>• Добавлять/убирать сотрудников</li>
                <li>• Изменять архивные данные</li>
                <li>• Отправлять сообщения сотрудникам</li>
                <li>• Блокировать аккаунты (утеря телефона)</li>
                <li>• Корректировать возвраты</li>
                <li>• Вносить остатки за сотрудника</li>
                <li>• Экспортировать отчёты PDF/Excel</li>
                <li>• Видеть кол-во пациентов у каждого</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-700 mb-2">👁️ Видит:</h4>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>• Приход (₽) по каждому сотруднику</li>
                <li>• Расход (шт. и ₽) по каждому сотруднику</li>
                <li>• Разницу приход-расход (₽)</li>
                <li>• Остаток на руках у сотрудников (шт. и ₽)</li>
                <li>• Общий остаток на подразделение</li>
                <li>• Количество пациентов у каждого</li>
                <li>• Уведомления о перерасходе</li>
                <li>• Уведомления о неактивности (7 дней)</li>
                <li>• Отчёт за предыдущий месяц (5-го числа)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Кладовщик */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">📦</div>
            <div>
              <h3 className="text-xl font-bold text-green-800">Кладовщик</h3>
              <p className="text-sm text-gray-500">Платформа: ПК (веб-приложение)</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-2">✅ Может:</h4>
              <ul className="space-y-1 text-sm text-green-600">
                <li>• Просматривать расход в штуках</li>
                <li>• Вносить изменения по приходу (₽)</li>
                <li>• Пропisывать цены на лекарства и оборудование</li>
                <li>• Менять цены на лекарства</li>
                <li>• Общаться в чате с сотрудниками</li>
                <li>• Корректировать возвраты</li>
                <li>• Видеть расход на каждого пациента</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-2">❌ Не может:</h4>
              <ul className="space-y-1 text-sm text-red-500">
                <li>• Управлять сотрудниками</li>
                <li>• Блокировать аккаунты</li>
                <li>• Видеть финансовые остатки</li>
                <li>• Экспортировать отчёты</li>
                <li>• Менять приход (только просмотр расхода в шт.)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Сотрудник */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">👨‍⚕️</div>
            <div>
              <h3 className="text-xl font-bold text-purple-800">Сотрудник (врач/фельдшер)</h3>
              <p className="text-sm text-gray-500">Платформа: Смартфон (PWA)</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-2">✅ Может:</h4>
              <ul className="space-y-1 text-sm text-purple-600">
                <li>• Отправлять расход (шт.) через смартфон</li>
                <li>• Указывать расход на каждого пациента (ФИО, ДР)</li>
                <li>• Видеть историю расходов текущего месяца</li>
                <li>• Редактировать расход на пациента (количество)</li>
                <li>• Видеть количество пациентов за месяц</li>
                <li>• Смотреть архив (только количество, без финансов)</li>
                <li>• Отвечать на сообщения руководителя</li>
                <li>• Отправлять сообщения кладовщику</li>
                <li>• Вносить начальные остатки при первом подключении</li>
                <li>• Оформлять возврат на склад</li>
              </ul>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-purple-700 mb-2">❌ Не видит:</h4>
              <ul className="space-y-1 text-sm text-red-500">
                <li>• Свои остатки в рублях</li>
                <li>• Финансовую составляющую</li>
                <li>• Цены на номенклатуру</li>
                <li>• Данные других сотрудников</li>
                <li>• Приход (рубли)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Матрица доступа */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🔐 Матрица доступа к данным</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-semibold">Данные</th>
                <th className="p-3 font-semibold text-blue-700">Руководитель</th>
                <th className="p-3 font-semibold text-green-700">Кладовщик</th>
                <th className="p-3 font-semibold text-purple-700">Сотрудник</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="p-3">Приход (₽)</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">🚫</td></tr>
              <tr><td className="p-3">Расход (шт.)</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">📝 RW (свой)</td></tr>
              <tr><td className="p-3">Расход (₽)</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">🚫</td><td className="p-3 text-center">🚫</td></tr>
              <tr><td className="p-3">Остаток (шт.)</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">🚫</td></tr>
              <tr><td className="p-3">Остаток (₽)</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">🚫</td><td className="p-3 text-center">🚫</td></tr>
              <tr><td className="p-3">Цены</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">🚫</td></tr>
              <tr><td className="p-3">Номенклатура</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">👁️ R (список)</td></tr>
              <tr><td className="p-3">Пациенты</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">📝 RW (свои)</td></tr>
              <tr><td className="p-3">Сообщения</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">📝 RW</td></tr>
              <tr><td className="p-3">Архив</td><td className="p-3 text-center">📝 RW</td><td className="p-3 text-center">👁️ R</td><td className="p-3 text-center">👁️ R (без ₽)</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ScreensSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📱 Экраны приложения</h2>

        {/* Экраны руководителя */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm">👨‍💼</span>
            Руководитель (ПК)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ScreenCard
              title="Дашборд"
              items={['Сводная таблица: приход/расход/остаток по сотрудникам', 'Общий остаток на подразделение', 'Индикаторы перерасхода (красные)', 'Графики динамики расхода', 'Быстрые действия']}
              color="blue"
            />
            <ScreenCard
              title="Сотрудники"
              items={['Список всех сотрудников со статусами', 'Добавление/удаление сотрудника', 'Изменение статуса (активен/неактивен/отпуск)', 'Блокировка аккаунта', 'Назначение прихода (₽) и смен']}
              color="blue"
            />
            <ScreenCard
              title="Карточка сотрудника"
              items={['ФИО, статус, персональный номер', 'Приход за период', 'Расход (шт. и ₽)', 'Остаток (шт. и ₽)', 'Количество пациентов', 'История операций', 'Кнопка "Написать"']}
              color="blue"
            />
            <ScreenCard
              title="Номенклатура"
              items={['Список лекарств и оборудования', 'Добавление позиций', 'Установка/изменение цен', 'Категории: лекарства, оборудование, расходники', 'Единицы измерения']}
              color="blue"
            />
            <ScreenCard
              title="Отчёт за месяц"
              items={['Таблица: ФИО, вызовы, приход, расход, остаток', 'Общий остаток на подразделение', 'Формат: PDF / Excel', 'Доступен 5-го числа каждого месяца', 'Архив за все предыдущие месяцы']}
              color="blue"
            />
            <ScreenCard
              title="Журнал изменений"
              items={['Кто, когда, что изменил', 'Фильтр по дате/пользователю/операции', 'Версионность данных', 'Откат изменений (только руководитель)']}
              color="blue"
            />
          </div>
        </div>

        {/* Экраны кладовщика */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">📦</span>
            Кладовщик (ПК)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ScreenCard
              title="Расход (шт.)"
              items={['Таблица расхода по сотрудникам', 'Детализация по пациентам', 'Фильтры по дате, сотруднику, препарату', 'Просмотр без финансовых данных']}
              color="green"
            />
            <ScreenCard
              title="Управление ценами"
              items={['Список номенклатуры', 'Изменение цен', 'История изменения цен', 'Дата вступления в силу']}
              color="green"
            />
            <ScreenCard
              title="Возвраты"
              items={['Список возвратов от сотрудников', 'Корректировка количества', 'Подтверждение приёма', 'Уведомления о новых возвратах']}
              color="green"
            />
            <ScreenCard
              title="Чат с сотрудниками"
              items={['Список диалогов', 'Отправка/получение сообщений', 'Уведомления о новых сообщениях']}
              color="green"
            />
          </div>
        </div>

        {/* Экраны сотрудника */}
        <div>
          <h3 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">👨‍⚕️</span>
            Сотрудник (Смартфон PWA)
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <ScreenCard
              title="Авторизация"
              items={['Ввод персонального номера', 'Ввод пароля', 'Чекбокс "Запомнить меня"', 'Сообщение при первом входе: "Добро пожаловать! 😊"', 'Сообщение при увольнении: "Вы с нами больше не сотрудничаете ☹"']}
              color="purple"
            />
            <ScreenCard
              title="Новый вызов"
              items={['ФИО пациента (свободный ввод)', 'Дата рождения пациента', 'Список номенклатуры (цельный)', 'Поле количества напротив каждого препарата', 'Ед. измерения: ампулы, таблетки, флаконы, штуки', 'Кнопка "Сохранить"']}
              color="purple"
            />
            <ScreenCard
              title="История расходов"
              items={['Список вызовов за текущий месяц', 'Детализация по каждому вызову', 'Редактирование количества', 'Дата и время записи', 'Общее количество пациентов за месяц']}
              color="purple"
            />
            <ScreenCard
              title="Архив"
              items={['Выбор месяца', 'Количество лекарств и оборудования', 'Без финансовой составляющей', 'Количество пациентов за месяц']}
              color="purple"
            />
            <ScreenCard
              title="Возврат"
              items={['Выбор номенклатуры для возврата', 'Количество', 'Дата', 'Уведомление руководителю и кладовщику']}
              color="purple"
            />
            <ScreenCard
              title="Сообщения"
              items={['Входящие от руководителя', 'Чат с кладовщиком', 'Ответы руководителю', 'Индикатор непрочитанных']}
              color="purple"
            />
            <ScreenCard
              title="Начальные остатки"
              items={['Только при первом подключении', 'Ввод остатков по каждой позиции (шт.)', 'Может сделать и руководитель', 'После подтверждения — недоступно для редактирования']}
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DataFlowSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔄 Потоки данных</h2>

        {/* Основной поток */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-700 mb-4">Основной бизнес-процесс</h3>
          <div className="relative">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <FlowStep num={1} title="Руководитель" desc="Вносит приход (₽), устанавливает цены, назначает смены" color="blue" />
              <FlowArrow />
              <FlowStep num={2} title="Сотрудник" desc="Выезжает на вызов, вносит расход на пациента (шт.)" color="purple" />
              <FlowArrow />
              <FlowStep num={3} title="Система" desc="Рассчитывает остаток, проверяет перерасход" color="amber" />
              <FlowArrow />
              <FlowStep num={4} title="Руководитель" desc="Получает отчёт, видит остатки, корректирует" color="blue" />
            </div>
          </div>
        </div>

        {/* Поток расхода */}
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">📝 Поток внесения расхода</h3>
          <div className="space-y-3">
            <FlowItem step="1" actor="Сотрудник" action="Открывает приложение → 'Новый вызов'" offline="✅" />
            <FlowItem step="2" actor="Сотрудник" action="Вводит ФИО и дату рождения пациента" offline="✅" />
            <FlowItem step="3" actor="Сотрудник" action="Видит список номенклатуры, проставляет количество" offline="✅" />
            <FlowItem step="4" actor="Система" action="Сохраняет данные локально (если офлайн)" offline="⚠️" />
            <FlowItem step="5" actor="Система" action="При появлении сети → синхронизация с Google Sheets" offline="🔄" />
            <FlowItem step="6" actor="Система" action="Пересчитывает остаток сотрудника (с учётом актуальных цен)" offline="⚙️" />
            <FlowItem step="7" actor="Система" action="Проверяет перерасход → уведомление руководителю" offline="🔔" />
          </div>
        </div>

        {/* Поток возврата */}
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">↩️ Поток возврата на склад</h3>
          <div className="space-y-3">
            <FlowItem step="1" actor="Сотрудник" action="Создаёт операцию 'Возврат' → выбирает номенклатуру и количество" offline="✅" />
            <FlowItem step="2" actor="Система" action="Увеличивает остаток сотрудника (возврат = минус расход)" offline="⚙️" />
            <FlowItem step="3" actor="Система" action="Уведомление руководителю и кладовщику" offline="🔔" />
            <FlowItem step="4" actor="Кладовщик" action="Проверяет, при необходимости корректирует" offline="📝" />
            <FlowItem step="5" actor="Руководитель" action="Может скорректировать возврат" offline="📝" />
          </div>
        </div>

        {/* Поток отчёта */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-700 mb-4">📊 Поток формирования отчёта</h3>
          <div className="space-y-3">
            <FlowItem step="1" actor="Система" action="5-го числа автоматически формирует отчёт за предыдущий месяц" offline="⚙️" />
            <FlowItem step="2" actor="Отчёт" action="ФИО | Кол-во вызовов | Приход (₽) | Расход (₽) | Остаток (₽)" offline="📋" />
            <FlowItem step="3" actor="Отчёт" action="Общий остаток на подразделение (₽)" offline="📋" />
            <FlowItem step="4" actor="Руководитель" action="Получает уведомление, может экспортировать PDF/Excel" offline="📤" />
          </div>
        </div>
      </div>

      {/* Офлайн-режим */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📡 Офлайн-режим и синхронизация</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2">При отсутствии сети:</h4>
            <ul className="space-y-1 text-sm text-amber-700">
              <li>• Данные расхода сохраняются локально (IndexedDB/LocalStorage)</li>
              <li>• Сотрудник может вносить данные до 72 часов</li>
              <li>• Очередь операций формируется локально</li>
              <li>• Визуальный индикатор офлайн-режима</li>
              <li>• Все данные помечаются временной меткой</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">При восстановлении сети:</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Автоматическая синхронизация очереди</li>
              <li>• Данные отправляются в Google Sheets</li>
              <li>• Разрешение конфликтов (по временной метке)</li>
              <li>• Подтверждение синхронизации сотруднику</li>
              <li>• Пересчёт остатков на сервере</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StorageSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Структура хранения данных (Google Sheets)</h2>
        <p className="text-gray-600 mb-6">Все данные хранятся в одной Google-таблице с разделением на листы:</p>

        <div className="space-y-4">
          <SheetCard
            name="👥 Сотрудники"
            fields={[
              { name: 'ID', type: 'Авто', desc: 'Уникальный идентификатор' },
              { name: 'Персональный номер', type: 'Текст', desc: 'Для авторизации' },
              { name: 'Пароль (хэш)', type: 'Текст', desc: 'Хешированный пароль' },
              { name: 'ФИО', type: 'Текст', desc: 'Полное имя' },
              { name: 'Статус', type: 'Выбор', desc: 'Активен / Неактивен / Отпуск / Уволен / Заблокирован' },
              { name: 'Дата найма', type: 'Дата', desc: '' },
              { name: 'Дата увольнения', type: 'Дата', desc: 'Если применимо' },
              { name: 'Первое подключение', type: 'Дата', desc: 'Для приветственного сообщения' },
            ]}
          />

          <SheetCard
            name="💊 Номенклатура"
            fields={[
              { name: 'ID', type: 'Авто', desc: 'Уникальный идентификатор' },
              { name: 'Название', type: 'Текст', desc: 'Наименование препарата/оборудования' },
              { name: 'Категория', type: 'Выбор', desc: 'Лекарство / Оборудование / Расходный материал' },
              { name: 'Ед. измерения', type: 'Выбор', desc: 'Ампулы / Таблетки / Флаконы / Штуки' },
              { name: 'Текущая цена', type: 'Число', desc: 'Актуальная цена в рублях' },
              { name: 'Активен', type: 'Булево', desc: 'Доступен для выбора' },
            ]}
          />

          <SheetCard
            name="💰 История цен"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'Номенклатура ID', type: 'Ссылка', desc: 'Связь с номенклатурой' },
              { name: 'Цена', type: 'Число', desc: 'Цена на дату' },
              { name: 'Дата изменения', type: 'Дата', desc: 'Когда цена вступила в силу' },
              { name: 'Кем изменено', type: 'Ссылка', desc: 'ID пользователя' },
            ]}
          />

          <SheetCard
            name="📥 Приход"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'Сотрудник ID', type: 'Ссылка', desc: '' },
              { name: 'Сумма (₽)', type: 'Число', desc: 'Приход в рублях' },
              { name: 'Период', type: 'Текст', desc: 'Месяц/год (напр. 2024-01)' },
              { name: 'Кол-во смен', type: 'Число', desc: '' },
              { name: 'Дата внесения', type: 'Дата', desc: '' },
              { name: 'Кем внесено', type: 'Ссылка', desc: '' },
            ]}
          />

          <SheetCard
            name="📤 Расход"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'Сотрудник ID', type: 'Ссылка', desc: '' },
              { name: 'Пациент ID', type: 'Ссылка', desc: 'Связь с пациентом' },
              { name: 'Номенклатура ID', type: 'Ссылка', desc: '' },
              { name: 'Количество', type: 'Число', desc: 'В единицах измерения' },
              { name: 'Дата вызова', type: 'Дата', desc: 'Дата приёма пациента' },
              { name: 'Дата внесения', type: 'Дата/Время', desc: 'Когда сотрудник внёс' },
              { name: 'Офлайн-метка', type: 'Булево', desc: 'Было ли внесено офлайн' },
              { name: 'Локальная метка', type: 'Дата/Время', desc: 'Время создания локально' },
            ]}
          />

          <SheetCard
            name="🏥 Пациенты"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'ФИО', type: 'Текст', desc: 'Свободный ввод' },
              { name: 'Дата рождения', type: 'Дата', desc: '' },
              { name: 'Сотрудник ID', type: 'Ссылка', desc: 'Кто обслуживал' },
              { name: 'Дата вызова', type: 'Дата', desc: '' },
            ]}
          />

          <SheetCard
            name="📦 Остатки (начальные)"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'Сотрудник ID', type: 'Ссылка', desc: '' },
              { name: 'Номенклатура ID', type: 'Ссылка', desc: '' },
              { name: 'Количество', type: 'Число', desc: 'Начальный остаток в шт.' },
              { name: 'Дата внесения', type: 'Дата', desc: '' },
              { name: 'Кем внесено', type: 'Ссылка', desc: 'Сотрудник или руководитель' },
            ]}
          />

          <SheetCard
            name="↩️ Возвраты"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'Сотрудник ID', type: 'Ссылка', desc: '' },
              { name: 'Номенклатура ID', type: 'Ссылка', desc: '' },
              { name: 'Количество', type: 'Число', desc: '' },
              { name: 'Дата', type: 'Дата', desc: '' },
              { name: 'Скорректировано', type: 'Булево', desc: '' },
              { name: 'Кем скорректировано', type: 'Ссылка', desc: '' },
              { name: 'Новое количество', type: 'Число', desc: 'Если была корректировка' },
            ]}
          />

          <SheetCard
            name="💬 Сообщения"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'От кого', type: 'Ссылка', desc: 'ID отправителя' },
              { name: 'Кому', type: 'Ссылка', desc: 'ID получателя' },
              { name: 'Текст', type: 'Текст', desc: '' },
              { name: 'Дата', type: 'Дата/Время', desc: '' },
              { name: 'Прочитано', type: 'Булево', desc: '' },
            ]}
          />

          <SheetCard
            name="📜 Журнал изменений"
            fields={[
              { name: 'ID', type: 'Авто', desc: '' },
              { name: 'Дата/Время', type: 'Дата/Время', desc: '' },
              { name: 'Пользователь', type: 'Ссылка', desc: 'Кто изменил' },
              { name: 'Таблица', type: 'Текст', desc: 'Какой лист' },
              { name: 'Запись ID', type: 'Текст', desc: 'Какую запись' },
              { name: 'Поле', type: 'Текст', desc: 'Какое поле' },
              { name: 'Было', type: 'Текст', desc: 'Старое значение' },
              { name: 'Стало', type: 'Текст', desc: 'Новое значение' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function BusinessSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">⚙️ Бизнес-правила</h2>

        <div className="space-y-6">
          {/* Расчёт остатка */}
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
            <h3 className="font-bold text-blue-800 text-lg mb-3">📐 Расчёт остатка в рублях</h3>
            <div className="bg-white rounded-lg p-4 font-mono text-sm">
              <p className="text-gray-700 mb-2">Остаток (₽) = Σ (Остаток_шт[i] × Цена_актуальная[i])</p>
              <p className="text-gray-500 text-xs mt-3">
                Где: Остаток_шт[i] — текущий остаток i-й позиции в штуках<br/>
                Цена_актуальная[i] — последняя установленная цена на i-ю позицию<br/>
                Учитываются все изменения цен за всё время
              </p>
            </div>
            <div className="mt-3 bg-amber-50 rounded p-3 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>⚠️ Важно:</strong> При изменении цены пересчёт остатка происходит автоматически. 
                Если цена выросла — остаток в ₽ увеличивается, даже если количество не менялось. 
                Это влияет на отчётность за прошлые периоды.
              </p>
            </div>
          </div>

          {/* Перерасход */}
          <div className="bg-red-50 rounded-lg p-5 border border-red-200">
            <h3 className="font-bold text-red-800 text-lg mb-3">🚨 Правило перерасхода</h3>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                <strong>Перерасход</strong> = Расход (₽) {'>'} Приход (₽)
              </p>
              <p className="text-gray-600 text-sm">
                При возникновении перерасхода:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                <li>Руководитель получает мгновенное уведомление</li>
                <li>В дашборде сотрудника появляется красный индикатор</li>
                <li>Записывается в журнал событий</li>
              </ul>
            </div>
          </div>

          {/* Неактивность */}
          <div className="bg-orange-50 rounded-lg p-5 border border-orange-200">
            <h3 className="font-bold text-orange-800 text-lg mb-3">⏰ Правило неактивности (7 дней)</h3>
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700 mb-2">
                Если сотрудник <strong>не вносит расход</strong> на протяжении 7 дней:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>Руководитель получает уведомление</li>
                <li>Статус автоматически не меняется (ручное управление)</li>
                <li>Возможные причины: отпуск, больничный, увольнение, проблема с сетью</li>
              </ul>
              <div className="mt-3 text-sm text-gray-500">
                <strong>Статусы сотрудника:</strong> Активен | Неактивен | Отпуск | Уволен | Заблокирован
              </div>
            </div>
          </div>

          {/* Возврат */}
          <div className="bg-green-50 rounded-lg p-5 border border-green-200">
            <h3 className="font-bold text-green-800 text-lg mb-3">↩️ Операция «Возврат»</h3>
            <div className="bg-white rounded-lg p-4">
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Сотрудник создаёт возврат → указывает номенклатуру и количество</li>
                <li>Возврат уменьшает расход (увеличивает остаток в шт.)</li>
                <li>Уведомление получает: руководитель + кладовщик</li>
                <li>Кладовщик или руководитель может скорректировать количество</li>
                <li>После корректировки — финальное значение фиксируется</li>
                <li>Все корректировки записываются в журнал</li>
              </ul>
            </div>
          </div>

          {/* Архив */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h3 className="font-bold text-gray-800 text-lg mb-3">📁 Архивные данные</h3>
            <div className="bg-white rounded-lg p-4">
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Архив формируется автоматически в конце каждого месяца</li>
                <li>Сотрудник видит: количество лекарств и оборудования (без финансов)</li>
                <li>Руководитель видит: полную информацию + может редактировать</li>
                <li>Доступен для просмотра за все предыдущие месяцы</li>
              </ul>
            </div>
          </div>

          {/* Блокировка */}
          <div className="bg-red-50 rounded-lg p-5 border border-red-200">
            <h3 className="font-bold text-red-800 text-lg mb-3">🔒 Блокировка аккаунта</h3>
            <div className="bg-white rounded-lg p-4">
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Причина: утеря телефона сотрудником</li>
                <li>Только руководитель может заблокировать/разблокировать</li>
                <li>Заблокированный сотрудник не может войти в приложение</li>
                <li>Данные сотрудника сохраняются</li>
                <li>После разблокировки — доступ восстанавливается</li>
              </ul>
            </div>
          </div>

          {/* Первое подключение */}
          <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
            <h3 className="font-bold text-purple-800 text-lg mb-3">🎉 Первое подключение</h3>
            <div className="bg-white rounded-lg p-4">
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Сотрудник видит: «Добро пожаловать в наш коллектив! 😊»</li>
                <li>Сотрудник вносит начальные остатки (или руководитель за него)</li>
                <li>После внесения — начальные остатки фиксируются</li>
              </ul>
            </div>
          </div>

          {/* Увольнение */}
          <div className="bg-gray-100 rounded-lg p-5 border border-gray-300">
            <h3 className="font-bold text-gray-800 text-lg mb-3">😔 Увольнение</h3>
            <div className="bg-white rounded-lg p-4">
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Руководитель меняет статус на «Уволен»</li>
                <li>При следующем входе: «К сожалению, Вы с нами больше не сотрудничаете ☹»</li>
                <li>Доступ к функционалу заблокирован</li>
                <li>Данные в архиве сохраняются</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔔 Система уведомлений</h2>

        <div className="space-y-4">
          <NotificationCard
            trigger="Перерасход сотрудника"
            recipient="Руководитель"
            condition="Расход (₽) > Приход (₽)"
            urgency="high"
            channel="Push + В приложении"
          />
          <NotificationCard
            trigger="Нет расхода 7 дней"
            recipient="Руководитель"
            condition="Последняя операция расхода > 7 дней назад"
            urgency="medium"
            channel="Push + В приложении"
          />
          <NotificationCard
            trigger="Новый возврат"
            recipient="Руководитель + Кладовщик"
            condition="Сотрудник создал операцию возврата"
            urgency="low"
            channel="В приложении"
          />
          <NotificationCard
            trigger="Новое сообщение"
            recipient="Сотрудник / Кладовщик"
            condition="Получено новое сообщение в чате"
            urgency="low"
            channel="Push + В приложении"
          />
          <NotificationCard
            trigger="Отчёт за месяц готов"
            recipient="Руководитель"
            condition="5-е число нового месяца"
            urgency="medium"
            channel="Push + Email"
          />
          <NotificationCard
            trigger="Синхронизация завершена"
            recipient="Сотрудник"
            condition="Восстановлена сеть, данные отправлены"
            urgency="low"
            channel="В приложении"
          />
          <NotificationCard
            trigger="Цена изменена"
            recipient="Руководитель (журнал)"
            condition="Кладовщик изменил цену"
            urgency="low"
            channel="В журнале"
          />
          <NotificationCard
            trigger="Корректировка возврата"
            recipient="Сотрудник"
            condition="Кладовщик/Руководитель скорректировал возврат"
            urgency="medium"
            channel="В приложении"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Ежемесячный отчёт (5-го числа)</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-3">Структура отчёта за предыдущий месяц:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border border-blue-200 p-2 text-left">ФИО сотрудника</th>
                  <th className="border border-blue-200 p-2">Кол-во вызовов</th>
                  <th className="border border-blue-200 p-2">Приход (₽)</th>
                  <th className="border border-blue-200 p-2">Расход (₽)</th>
                  <th className="border border-blue-200 p-2">Остаток (₽)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-200 p-2">Иванов И.И.</td>
                  <td className="border border-gray-200 p-2 text-center">18</td>
                  <td className="border border-gray-200 p-2 text-center">150 000</td>
                  <td className="border border-gray-200 p-2 text-center">120 000</td>
                  <td className="border border-gray-200 p-2 text-center">30 000</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 p-2">Петров П.П.</td>
                  <td className="border border-gray-200 p-2 text-center">22</td>
                  <td className="border border-gray-200 p-2 text-center">150 000</td>
                  <td className="border border-gray-200 p-2 text-center">155 000</td>
                  <td className="border border-gray-200 p-2 text-center text-red-600 font-bold">-5 000 ⚠️</td>
                </tr>
                <tr className="bg-blue-50 font-bold">
                  <td className="border border-blue-200 p-2">ИТОГО на подразделение</td>
                  <td className="border border-blue-200 p-2 text-center">520</td>
                  <td className="border border-blue-200 p-2 text-center">4 500 000</td>
                  <td className="border border-blue-200 p-2 text-center">3 800 000</td>
                  <td className="border border-blue-200 p-2 text-center">700 000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex gap-3">
            <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition">
              📄 Экспорт PDF
            </button>
            <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition">
              📊 Экспорт Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🏗️ Техническая архитектура</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-3">🖥️ ПК-приложение (Руководитель + Кладовщик)</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• <strong>Фреймворк:</strong> React + TypeScript</li>
              <li>• <strong>UI:</strong> Tailwind CSS + компоненты</li>
              <li>• <strong>Графики:</strong> Recharts / Chart.js</li>
              <li>• <strong>Экспорт:</strong> jsPDF + SheetJS (xlsx)</li>
              <li>• <strong>API:</strong> REST через Google Apps Script</li>
              <li>• <strong>Авторизация:</strong> JWT (через Apps Script)</li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-3">📱 PWA (Сотрудники)</h3>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• <strong>Фреймворк:</strong> React + TypeScript</li>
              <li>• <strong>PWA:</strong> Service Worker + Manifest</li>
              <li>• <strong>Офлайн:</strong> IndexedDB (localForage)</li>
              <li>• <strong>Синхронизация:</strong> Background Sync API</li>
              <li>• <strong>Push:</strong> Web Push Notifications</li>
              <li>• <strong>Адаптив:</strong> Mobile-first дизайн</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">📊 Google Sheets (База данных)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 text-sm mb-2">Google Apps Script (Backend):</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• REST API endpoints</li>
                <li>• Авторизация и аутентификация</li>
                <li>• Валидация данных</li>
                <li>• Журналирование изменений</li>
                <li>• Cron-задачи (отчёты, проверки)</li>
                <li>• Отправка уведомлений</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 text-sm mb-2">Структура таблицы:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• 10 листов (см. раздел «Хранение»)</li>
                <li>• Связи через ID</li>
                <li>• Индексация по ключевым полям</li>
                <li>• Бэкап (ежедневный)</li>
                <li>• Лимит: ~5M ячеек</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Схема взаимодействия */}
        <div className="bg-white rounded-lg p-5 border border-gray-200">
          <h3 className="font-bold text-gray-800 mb-4">🔗 Схема взаимодействия компонентов</h3>
          <div className="font-mono text-xs md:text-sm bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto">
            <pre>{`
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   РУКОВОДИТЕЛЬ  │     │    КЛАДОВЩИК    │     │   СОТРУДНИКИ    │
│     (ПК)        │     │     (ПК)        │     │   (PWA x30)     │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         │     HTTPS/REST        │     HTTPS/REST        │  HTTPS/REST
         │                       │                       │  + Offline
         └───────────┬───────────┴───────────┬───────────┘
                     │                       │
              ┌──────┴──────┐         ┌──────┴──────┐
              │  Google     │         │   Google    │
              │  Apps       │◄───────►│   Sheets    │
              │  Script     │  Read/  │  (10 sheets)│
              │  (Backend)  │  Write  │             │
              └──────┬──────┘         └─────────────┘
                     │
              ┌──────┴──────┐
              │  Firebase   │
              │  Cloud      │
              │  Messaging  │
              │  (Push)     │
              └─────────────┘
            `}</pre>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">⚡ Ограничения и риски</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Google Sheets лимиты:</h4>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>• ~5 000 000 ячеек на таблицу</li>
              <li>• 6 минут выполнения скрипта</li>
              <li>• 20 000 запросов/день (бесплатно)</li>
              <li>• Задержка записи: 1-3 сек</li>
              <li>• Нет транзакций (решение: блокировки)</li>
            </ul>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">🔴 Риски:</h4>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• Одновременная запись (конфликты)</li>
              <li>• Потеря данных при сбое синхронизации</li>
              <li>• Офлайн &gt; 72 часов — данные могут устареть</li>
              <li>• Нет полноценных транзакций</li>
              <li>• Масштабирование при росте данных</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">✅ Митигация:</h4>
            <ul className="space-y-1 text-sm text-green-700">
              <li>• Очереди операций с временными метками</li>
              <li>• Локальный кеш + retry логика</li>
              <li>• Еженедельный бэкап таблицы</li>
              <li>• Версионность всех изменений</li>
              <li>• Возможность миграции на Firestore</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">🚀 Будущее развитие:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Миграция на Firebase/Supabase</li>
              <li>• Мобильные приложения (React Native)</li>
              <li>• Интеграция с МИС</li>
              <li>• Аналитика и прогнозирование</li>
              <li>• Автоматический заказ препаратов</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📅 План реализации (этапы)</h3>
        <div className="space-y-3">
          <PhaseCard phase="1" title="MVP — Базовый учёт" duration="2-3 недели" items={['Авторизация', 'Номенклатура', 'Внесение расхода', 'Офлайн-режим', 'Базовый дашборд руководителя']} />
          <PhaseCard phase="2" title="Финансы и отчёты" duration="2 недели" items={['Расчёт остатков в ₽', 'Приход/расход/остаток', 'Ежемесячный отчёт', 'Экспорт PDF/Excel', 'История цен']} />
          <PhaseCard phase="3" title="Коммуникация" duration="1-2 недели" items={['Чат руководитель-сотрудник', 'Чат кладовщик-сотрудник', 'Уведомления (Push)', 'Сообщения при входе']} />
          <PhaseCard phase="4" title="Продвинутый функционал" duration="2 недели" items={['Возвраты', 'Журнал изменений', 'Блокировка аккаунтов', 'Архив', 'Корректировки']} />
          <PhaseCard phase="5" title="Тестирование и запуск" duration="1-2 недели" items={['Нагрузочное тестирование', 'UAT с реальными данными', 'Обучение пользователей', 'Мониторинг и багфикс']} />
        </div>
      </div>
    </div>
  );
}

// Helper Components

function StatCard({ label, value, subtitle, color }: { label: string; value: string; subtitle?: string; color: string }) {
  const colors: Record<string, string> = {
    purple: 'bg-purple-50 border-purple-200 text-purple-800',
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    amber: 'bg-amber-50 border-amber-200 text-amber-800',
  };
  return (
    <div className={`rounded-lg p-4 border ${colors[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm font-medium">{label}</div>
      {subtitle && <div className="text-xs opacity-70">{subtitle}</div>}
    </div>
  );
}

function EntityCard({ name, fields }: { name: string; fields: string[] }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-2">{name}</h4>
      <div className="flex flex-wrap gap-1">
        {fields.map((f) => (
          <span key={f} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">{f}</span>
        ))}
      </div>
    </div>
  );
}

function ScreenCard({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colors: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    purple: 'border-purple-200 bg-purple-50',
  };
  const titleColors: Record<string, string> = {
    blue: 'text-blue-800',
    green: 'text-green-800',
    purple: 'text-purple-800',
  };
  return (
    <div className={`rounded-lg p-4 border ${colors[color]}`}>
      <h4 className={`font-semibold ${titleColors[color]} mb-2`}>{title}</h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-gray-600 flex items-start gap-1">
            <span className="text-gray-400">•</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SheetCard({ name, fields }: { name: string; fields: { name: string; type: string; desc: string }[] }) {
  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-800 text-sm">{name}</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 font-medium text-gray-600">Поле</th>
              <th className="text-left p-2 font-medium text-gray-600">Тип</th>
              <th className="text-left p-2 font-medium text-gray-600">Описание</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, i) => (
              <tr key={i} className="border-t border-gray-100">
                <td className="p-2 font-medium text-gray-700">{f.name}</td>
                <td className="p-2"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{f.type}</span></td>
                <td className="p-2 text-gray-500">{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FlowStep({ num, title, desc, color }: { num: number; title: string; desc: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 border-blue-300',
    purple: 'bg-purple-100 border-purple-300',
    amber: 'bg-amber-100 border-amber-300',
  };
  return (
    <div className={`flex-1 rounded-lg p-4 border-2 ${colors[color]} text-center`}>
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold text-sm border">{num}</div>
      <div className="font-semibold text-sm text-gray-800">{title}</div>
      <div className="text-xs text-gray-600 mt-1">{desc}</div>
    </div>
  );
}

function FlowArrow() {
  return <div className="text-2xl text-gray-400 hidden md:block">→</div>;
}

function FlowItem({ step, actor, action, offline }: { step: string; actor: string; action: string; offline: string }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-100">
      <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{step}</div>
      <div className="flex-1">
        <span className="font-medium text-gray-700 text-sm">{actor}:</span>{' '}
        <span className="text-gray-600 text-sm">{action}</span>
      </div>
      <span className="text-lg flex-shrink-0">{offline}</span>
    </div>
  );
}

function NotificationCard({ trigger, recipient, condition, urgency, channel }: {
  trigger: string; recipient: string; condition: string; urgency: string; channel: string;
}) {
  const urgencyColors: Record<string, string> = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-amber-50 border-amber-200',
    low: 'bg-green-50 border-green-200',
  };
  const urgencyBadge: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-green-100 text-green-700',
  };
  const urgencyLabel: Record<string, string> = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий',
  };
  return (
    <div className={`rounded-lg p-4 border ${urgencyColors[urgency]}`}>
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-800">🔔 {trigger}</h4>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${urgencyBadge[urgency]}`}>
          {urgencyLabel[urgency]}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div><span className="text-gray-500">Кому:</span> <span className="font-medium">{recipient}</span></div>
        <div><span className="text-gray-500">Условие:</span> <span className="font-medium">{condition}</span></div>
        <div><span className="text-gray-500">Канал:</span> <span className="font-medium">{channel}</span></div>
      </div>
    </div>
  );
}

function PhaseCard({ phase, title, duration, items }: { phase: string; title: string; duration: string; items: string[] }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex gap-4">
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center font-bold text-indigo-700 flex-shrink-0">
        {phase}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{duration}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {items.map((item, i) => (
            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
