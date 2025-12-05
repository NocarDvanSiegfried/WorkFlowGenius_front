import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="w-full bg-vk-bg-secondary border-t border-vk-border">
      <div className="max-w-vk-1360 mx-auto px-vk-4 py-vk-16">
        <div className="mb-vk-8">
          <h1 className="text-vk-accent-blue font-vk-bold text-vk-2xl leading-tight mb-vk-4">VK TaskFlow</h1>
          <div className="border-t border-vk-border"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-vk-12 mb-vk-8">
          <div>
            <h4 className="text-vk-text-primary font-vk-medium text-vk-sm leading-normal mb-vk-4">Сервисы</h4>
            <ul className="flex flex-col gap-vk-2">
              <li><Link to="/tasks" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Задачи</Link></li>
              <li><Link to="/admin" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Помощник</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-vk-text-primary font-vk-medium text-vk-sm leading-normal mb-vk-4">Компания</h4>
            <ul className="flex flex-col gap-vk-2">
              <li><Link to="/about" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">О нас</Link></li>
              <li><Link to="/contacts" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-vk-text-primary font-vk-medium text-vk-sm leading-normal mb-vk-4">Клиентам</h4>
            <ul className="flex flex-col gap-vk-2">
              <li><Link to="/support" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Техподдержка</Link></li>
              <li><Link to="/docs" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Документация</Link></li>
              <li><Link to="/tutorials" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Видеоуроки</Link></li>
              <li><Link to="/guides" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Инструкции</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-vk-text-primary font-vk-medium text-vk-sm leading-normal mb-vk-4">Тарифы</h4>
            <ul className="flex flex-col gap-vk-2">
              <li><Link to="/pricing" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Тарифные планы</Link></li>
              <li><Link to="/pricing/compare" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Сравнение тарифов</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-vk-text-primary font-vk-medium text-vk-sm leading-normal mb-vk-4">Партнерам</h4>
            <ul className="flex flex-col gap-vk-2">
              <li><Link to="/partners" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Партнерская программа</Link></li>
              <li><Link to="/partners/benefits" className="text-vk-text-secondary hover:text-vk-text-link-hover transition-colors duration-vk-base text-vk-sm">Преимущества</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-vk-border pt-vk-4">
          <div className="text-vk-text-secondary font-vk-regular text-vk-sm text-center">
            © 2025 VK TaskFlow. Все права защищены.
          </div>
        </div>
      </div>
    </footer>
  )
}

