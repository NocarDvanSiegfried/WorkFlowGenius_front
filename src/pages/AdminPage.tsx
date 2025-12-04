import { Link } from 'react-router-dom'
import { useState } from 'react'
import { HomeIcon, ClipboardListIcon, UsersIcon } from '../components/icons'
import {
  VKCard,
  VKInput,
  VKSectionHeader,
  VKTag,
  VKBadge,
  VKAvatar,
  VKButton,
  VKSelect,
  VKModal,
} from '../components/vk'

const mockEmployees = [
  {
    id: '1',
    name: 'Иван Иванов',
    role: 'Разработчик',
    email: 'ivan@example.com',
    tasks: 12,
    completed: 8,
    status: 'active',
    avatar: undefined,
  },
  {
    id: '2',
    name: 'Мария Петрова',
    role: 'Дизайнер',
    email: 'maria@example.com',
    tasks: 10,
    completed: 9,
    status: 'active',
    avatar: undefined,
  },
  {
    id: '3',
    name: 'Алексей Сидоров',
    role: 'Менеджер',
    email: 'alex@example.com',
    tasks: 15,
    completed: 12,
    status: 'active',
    avatar: undefined,
  },
  {
    id: '4',
    name: 'Елена Козлова',
    role: 'Разработчик',
    email: 'elena@example.com',
    tasks: 8,
    completed: 6,
    status: 'inactive',
    avatar: undefined,
  },
  {
    id: '5',
    name: 'Дмитрий Волков',
    role: 'Тестировщик',
    email: 'dmitry@example.com',
    tasks: 14,
    completed: 11,
    status: 'active',
    avatar: undefined,
  },
]

const roleColors = {
  Разработчик: 'primary',
  Дизайнер: 'success',
  Менеджер: 'warning',
  Тестировщик: 'primary',
} as const

export function AdminPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || emp.role === selectedRole
    return matchesSearch && matchesRole
  })

  const stats = {
    total: mockEmployees.length,
    active: mockEmployees.filter((e) => e.status === 'active').length,
    totalTasks: mockEmployees.reduce((sum, e) => sum + e.tasks, 0),
    completedTasks: mockEmployees.reduce((sum, e) => sum + e.completed, 0),
  }

  return (
    <div className="min-h-screen bg-vk-bg-secondary w-full">
      <header className="w-full h-[95px] bg-vk-bg-content shadow-vk-1">
        <div className="w-full max-w-[1920px] mx-auto h-full px-vk-4 sm:px-vk-6 md:px-vk-8 flex items-center justify-between">
          <div className="flex items-center gap-vk-4 flex-shrink-0">
            <div className="w-[55px] h-[55px] rounded-vk-md bg-gradient-to-br from-vk-accent-blue to-vk-status-positive flex items-center justify-center flex-shrink-0">
              <span className="text-white font-vk-semibold text-vk-2xl leading-tight">AI</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-vk-text-primary font-vk-regular text-vk-lg leading-normal">
                WorkFlowGenius
              </h1>
              <p className="text-vk-text-secondary font-vk-regular text-vk-sm leading-normal">
                Интеллектуальная система управления
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-vk-5">
            <Link
              to="/"
              className="flex items-center gap-vk-2 h-[45px] hover:opacity-80 transition-opacity duration-vk-base"
            >
              <HomeIcon className="w-5 h-5 text-vk-text-tertiary flex-shrink-0" />
              <span className="text-vk-text-tertiary font-vk-regular text-vk-lg leading-normal whitespace-nowrap">
                Главная
              </span>
            </Link>

            <Link
              to="/tasks"
              className="flex items-center gap-vk-2 h-[45px] hover:opacity-80 transition-opacity duration-vk-base"
            >
              <ClipboardListIcon className="w-5 h-5 text-vk-text-tertiary flex-shrink-0" />
              <span className="text-vk-text-tertiary font-vk-regular text-vk-lg leading-normal whitespace-nowrap">
                Мои задачи
              </span>
            </Link>

            <div className="px-vk-4 h-[45px] bg-vk-accent-blue rounded-vk-md flex items-center gap-vk-2 flex-shrink-0">
              <UsersIcon className="w-5 h-5 text-white flex-shrink-0" />
              <span className="text-white font-vk-medium text-vk-lg leading-normal whitespace-nowrap">
                Администрирование
              </span>
            </div>
          </nav>
        </div>
      </header>

      <main className="w-full pb-vk-20">
        <div className="max-w-[1780px] mx-auto px-vk-4 sm:px-vk-6 md:px-vk-8 pt-vk-8">
          <VKSectionHeader
            title="Администрирование"
            subtitle="Управление сотрудниками и настройки системы"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-vk-4 mb-vk-6">
            <VKCard variant="default" padding="m" className="animate-fade-in">
              <p className="text-vk-text-secondary font-vk-regular text-vk-sm mb-vk-1">Всего сотрудников</p>
              <p className="text-vk-text-primary font-vk-bold text-vk-3xl">{stats.total}</p>
            </VKCard>
            <VKCard variant="default" padding="m" className="animate-fade-in">
              <p className="text-vk-text-secondary font-vk-regular text-vk-sm mb-vk-1">Активных</p>
              <p className="text-vk-text-primary font-vk-bold text-vk-3xl">{stats.active}</p>
            </VKCard>
            <VKCard variant="default" padding="m" className="animate-fade-in">
              <p className="text-vk-text-secondary font-vk-regular text-vk-sm mb-vk-1">Всего задач</p>
              <p className="text-vk-text-primary font-vk-bold text-vk-3xl">{stats.totalTasks}</p>
            </VKCard>
            <VKCard variant="default" padding="m" className="animate-fade-in">
              <p className="text-vk-text-secondary font-vk-regular text-vk-sm mb-vk-1">Выполнено</p>
              <p className="text-vk-text-primary font-vk-bold text-vk-3xl">{stats.completedTasks}</p>
            </VKCard>
          </div>

          <div className="flex flex-col md:flex-row gap-vk-4 mb-vk-6">
            <div className="flex-1">
              <VKInput
                type="text"
                placeholder="Поиск сотрудников..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <VKSelect
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: 'all', label: 'Все роли' },
                { value: 'Разработчик', label: 'Разработчик' },
                { value: 'Дизайнер', label: 'Дизайнер' },
                { value: 'Менеджер', label: 'Менеджер' },
                { value: 'Тестировщик', label: 'Тестировщик' },
              ]}
            />
            <VKButton variant="primary" onClick={() => setIsModalOpen(true)}>
              Добавить сотрудника
            </VKButton>
          </div>

          <VKCard variant="default" padding="m" className="animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-vk-border-secondary">
                    <th className="text-left py-vk-3 px-vk-4 text-vk-sm font-vk-semibold text-vk-text-primary">
                      Сотрудник
                    </th>
                    <th className="text-left py-vk-3 px-vk-4 text-vk-sm font-vk-semibold text-vk-text-primary">
                      Роль
                    </th>
                    <th className="text-left py-vk-3 px-vk-4 text-vk-sm font-vk-semibold text-vk-text-primary">
                      Email
                    </th>
                    <th className="text-left py-vk-3 px-vk-4 text-vk-sm font-vk-semibold text-vk-text-primary">
                      Задачи
                    </th>
                    <th className="text-left py-vk-3 px-vk-4 text-vk-sm font-vk-semibold text-vk-text-primary">
                      Статус
                    </th>
                    <th className="text-right py-vk-3 px-vk-4 text-vk-sm font-vk-semibold text-vk-text-primary">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="border-b border-vk-border-secondary hover:bg-vk-bg-hover transition-colors duration-vk-base"
                    >
                      <td className="py-vk-4 px-vk-4">
                        <div className="flex items-center gap-vk-3">
                          <VKAvatar name={employee.name} size="m" online={employee.status === 'active'} />
                          <span className="text-vk-text-primary font-vk-medium text-vk-base">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-vk-4 px-vk-4">
                        <VKTag variant={roleColors[employee.role as keyof typeof roleColors] || 'default'}>
                          {employee.role}
                        </VKTag>
                      </td>
                      <td className="py-vk-4 px-vk-4">
                        <span className="text-vk-text-secondary text-vk-sm">{employee.email}</span>
                      </td>
                      <td className="py-vk-4 px-vk-4">
                        <div className="flex items-center gap-vk-2">
                          <span className="text-vk-text-primary font-vk-medium text-vk-sm">
                            {employee.completed}/{employee.tasks}
                          </span>
                          <div className="w-16 h-1.5 bg-vk-bg-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-vk-accent-blue rounded-full transition-all duration-vk-base"
                              style={{ width: `${(employee.completed / employee.tasks) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-vk-4 px-vk-4">
                        <VKBadge variant={employee.status === 'active' ? 'success' : 'default'} size="s">
                          {employee.status === 'active' ? 'Активен' : 'Неактивен'}
                        </VKBadge>
                      </td>
                      <td className="py-vk-4 px-vk-4">
                        <div className="flex items-center justify-end gap-vk-2">
                          <VKButton variant="tertiary" size="s">
                            Редактировать
                          </VKButton>
                          <VKButton variant="tertiary" size="s">
                            Удалить
                          </VKButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </VKCard>
        </div>
      </main>

      <VKModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Добавить сотрудника" size="m">
        <div className="space-y-vk-4">
          <VKInput type="text" placeholder="Имя" />
          <VKInput type="email" placeholder="Email" />
          <VKSelect
            options={[
              { value: 'Разработчик', label: 'Разработчик' },
              { value: 'Дизайнер', label: 'Дизайнер' },
              { value: 'Менеджер', label: 'Менеджер' },
              { value: 'Тестировщик', label: 'Тестировщик' },
            ]}
            placeholder="Выберите роль"
          />
          <div className="flex items-center justify-end gap-vk-2 pt-vk-4">
            <VKButton variant="secondary" onClick={() => setIsModalOpen(false)}>
              Отмена
            </VKButton>
            <VKButton variant="primary" onClick={() => setIsModalOpen(false)}>
              Добавить
            </VKButton>
          </div>
        </div>
      </VKModal>
    </div>
  )
}

