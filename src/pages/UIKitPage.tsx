import { useState } from 'react'
import {
  VKButton,
  VKCard,
  VKBadge,
  VKTag,
  VKInput,
  VKSelect,
  VKCheckbox,
  VKRadio,
  VKSlider,
  VKAvatar,
  VKModal,
  VKDialog,
  VKTabs,
  VKTab,
  VKSectionHeader,
} from '../components/vk'

export function UIKitPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('tab1')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <div className="min-h-screen bg-vk-bg-secondary w-full p-vk-8">
      <div className="max-w-vk-1400 mx-auto space-y-vk-8">
        <VKSectionHeader
          title="VK UI Kit - Компоненты"
          subtitle="Превью всех доступных компонентов дизайн-системы"
        />

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Кнопки</h3>
          <div className="flex flex-wrap gap-vk-3">
            <VKButton variant="primary">Primary</VKButton>
            <VKButton variant="secondary">Secondary</VKButton>
            <VKButton variant="tertiary">Tertiary</VKButton>
            <VKButton variant="outline">Outline</VKButton>
            <VKButton variant="text">Text</VKButton>
            <VKButton variant="primary" disabled>
              Disabled
            </VKButton>
            <VKButton variant="primary" loading>
              Loading
            </VKButton>
          </div>
          <div className="flex flex-wrap gap-vk-3">
            <VKButton variant="primary" size="s">
              Small
            </VKButton>
            <VKButton variant="primary" size="m">
              Medium
            </VKButton>
            <VKButton variant="primary" size="l">
              Large
            </VKButton>
          </div>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Карточки</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-vk-4">
            <VKCard variant="default" padding="m">
              <p className="text-vk-text-primary font-vk-medium mb-vk-2">Default Card</p>
              <p className="text-vk-text-secondary text-vk-sm">Карточка с border</p>
            </VKCard>
            <VKCard variant="outlined" padding="m">
              <p className="text-vk-text-primary font-vk-medium mb-vk-2">Outlined Card</p>
              <p className="text-vk-text-secondary text-vk-sm">Карточка с outline</p>
            </VKCard>
            <VKCard variant="elevated" padding="m">
              <p className="text-vk-text-primary font-vk-medium mb-vk-2">Elevated Card</p>
              <p className="text-vk-text-secondary text-vk-sm">Карточка с тенью</p>
            </VKCard>
          </div>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Бейджи и Теги</h3>
          <div className="flex flex-wrap gap-vk-3">
            <VKBadge variant="default">Default</VKBadge>
            <VKBadge variant="primary">Primary</VKBadge>
            <VKBadge variant="success">Success</VKBadge>
            <VKBadge variant="warning">Warning</VKBadge>
            <VKBadge variant="error">Error</VKBadge>
            <VKBadge variant="primary" size="s">
              Small
            </VKBadge>
          </div>
          <div className="flex flex-wrap gap-vk-3">
            <VKTag variant="default">Default Tag</VKTag>
            <VKTag variant="primary">Primary Tag</VKTag>
            <VKTag variant="success">Success Tag</VKTag>
            <VKTag variant="warning">Warning Tag</VKTag>
            <VKTag variant="error">Error Tag</VKTag>
            <VKTag variant="default" removable onRemove={() => alert('Removed')}>
              Removable
            </VKTag>
          </div>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Поля ввода</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-vk-4">
            <VKInput type="text" placeholder="Обычное поле" />
            <VKInput type="text" placeholder="С ошибкой" error helperText="Поле обязательно для заполнения" />
            <VKSelect
              options={[
                { value: '1', label: 'Опция 1' },
                { value: '2', label: 'Опция 2' },
                { value: '3', label: 'Опция 3' },
              ]}
              placeholder="Выберите опцию"
            />
          </div>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Чекбоксы и Радио</h3>
          <div className="space-y-vk-3">
            <VKCheckbox label="Чекбокс 1" checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />
            <VKCheckbox label="Чекбокс 2 (отмечен)" checked />
            <VKCheckbox label="Чекбокс 3 (disabled)" disabled />
            <VKCheckbox label="Чекбокс 4 (ошибка)" error />
          </div>
          <div className="space-y-vk-3">
            <VKRadio label="Радио 1" name="radio" value="option1" checked={radioValue === 'option1'} onChange={(e) => setRadioValue(e.target.value)} />
            <VKRadio label="Радио 2" name="radio" value="option2" checked={radioValue === 'option2'} onChange={(e) => setRadioValue(e.target.value)} />
            <VKRadio label="Радио 3 (disabled)" name="radio" disabled />
          </div>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Слайдер</h3>
          <VKSlider
            label="Значение"
            valueLabel={`${sliderValue}%`}
            min={0}
            max={100}
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
          />
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Аватары</h3>
          <div className="flex flex-wrap items-center gap-vk-4">
            <VKAvatar name="Иван Иванов" size="s" online />
            <VKAvatar name="Мария Петрова" size="m" online />
            <VKAvatar name="Алексей Сидоров" size="l" />
            <VKAvatar name="Елена Козлова" size="xl" online />
            <VKAvatar src="https://i.pravatar.cc/150?img=1" size="m" online />
          </div>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Табы</h3>
          <VKTabs>
            <VKTab active={activeTab === 'tab1'} onClick={() => setActiveTab('tab1')}>
              Таб 1
            </VKTab>
            <VKTab active={activeTab === 'tab2'} onClick={() => setActiveTab('tab2')}>
              Таб 2
            </VKTab>
            <VKTab active={activeTab === 'tab3'} onClick={() => setActiveTab('tab3')}>
              Таб 3
            </VKTab>
          </VKTabs>
          <VKCard variant="default" padding="m">
            <p className="text-vk-text-secondary">
              Активный таб: <strong>{activeTab}</strong>
            </p>
          </VKCard>
        </section>

        <section className="space-y-vk-4">
          <h3 className="text-vk-xl font-vk-semibold text-vk-text-primary">Модальные окна</h3>
          <div className="flex gap-vk-3">
            <VKButton variant="primary" onClick={() => setModalOpen(true)}>
              Открыть модалку
            </VKButton>
            <VKButton variant="secondary" onClick={() => setDialogOpen(true)}>
              Открыть диалог
            </VKButton>
          </div>
        </section>

        <VKModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Пример модального окна" size="m">
          <div className="space-y-vk-4">
            <p className="text-vk-text-secondary">
              Это пример модального окна. Здесь может быть любой контент.
            </p>
            <div className="flex items-center justify-end gap-vk-2 pt-vk-4">
              <VKButton variant="secondary" onClick={() => setModalOpen(false)}>
                Отмена
              </VKButton>
              <VKButton variant="primary" onClick={() => setModalOpen(false)}>
                Подтвердить
              </VKButton>
            </div>
          </div>
        </VKModal>

        <VKDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Подтверждение действия"
          message="Вы уверены, что хотите выполнить это действие?"
          confirmText="Да, выполнить"
          cancelText="Отмена"
          onConfirm={() => alert('Подтверждено!')}
        />
      </div>
    </div>
  )
}

