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
  VKContainer,
  VKSpacing,
  VKFlex,
  VKGrid,
  VKTitle,
  VKText,
} from '../components/vk'

export function UIKitPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('tab1')
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [sliderValue, setSliderValue] = useState(50)

  return (
    <VKContainer size="l">
      <VKSpacing size="xl">
        <VKSectionHeader
          title="VK UI Kit - Компоненты"
          subtitle="Превью всех доступных компонентов дизайн-системы"
        />

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Кнопки
            </VKTitle>
            <VKFlex direction="row" gap="s" wrap>
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
              <VKButton variant="primary" size="s">
                Small
              </VKButton>
              <VKButton variant="primary" size="m">
                Medium
              </VKButton>
              <VKButton variant="primary" size="l">
                Large
              </VKButton>
            </VKFlex>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Карточки
            </VKTitle>
            <VKGrid columns={3} gap="m">
              <VKCard variant="default" padding="m">
                <VKFlex direction="column" gap="s">
                  <VKTitle level={5} weight="medium">
                    Default Card
                  </VKTitle>
                  <VKText size="sm" color="secondary">
                    Карточка с border
                  </VKText>
                </VKFlex>
              </VKCard>
              <VKCard variant="outlined" padding="m">
                <VKFlex direction="column" gap="s">
                  <VKTitle level={5} weight="medium">
                    Outlined Card
                  </VKTitle>
                  <VKText size="sm" color="secondary">
                    Карточка с outline
                  </VKText>
                </VKFlex>
              </VKCard>
              <VKCard variant="elevated" padding="m">
                <VKFlex direction="column" gap="s">
                  <VKTitle level={5} weight="medium">
                    Elevated Card
                  </VKTitle>
                  <VKText size="sm" color="secondary">
                    Карточка с тенью
                  </VKText>
                </VKFlex>
              </VKCard>
            </VKGrid>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Бейджи и Теги
            </VKTitle>
            <VKFlex direction="row" gap="s" wrap>
              <VKBadge variant="default">Default</VKBadge>
              <VKBadge variant="primary">Primary</VKBadge>
              <VKBadge variant="success">Success</VKBadge>
              <VKBadge variant="warning">Warning</VKBadge>
              <VKBadge variant="error">Error</VKBadge>
              <VKBadge variant="primary" size="s">
                Small
              </VKBadge>
              <VKTag variant="default">Default Tag</VKTag>
              <VKTag variant="primary">Primary Tag</VKTag>
              <VKTag variant="success">Success Tag</VKTag>
              <VKTag variant="warning">Warning Tag</VKTag>
              <VKTag variant="error">Error Tag</VKTag>
              <VKTag variant="default" removable onRemove={() => alert('Removed')}>
                Removable
              </VKTag>
            </VKFlex>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Поля ввода
            </VKTitle>
            <VKGrid columns={2} gap="m">
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
            </VKGrid>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Чекбоксы и Радио
            </VKTitle>
            <VKFlex direction="column" gap="s">
              <VKCheckbox label="Чекбокс 1" checked={checkboxChecked} onChange={(e) => setCheckboxChecked(e.target.checked)} />
              <VKCheckbox label="Чекбокс 2 (отмечен)" checked />
              <VKCheckbox label="Чекбокс 3 (disabled)" disabled />
              <VKCheckbox label="Чекбокс 4 (ошибка)" error />
              <VKRadio label="Радио 1" name="radio" value="option1" checked={radioValue === 'option1'} onChange={(e) => setRadioValue(e.target.value)} />
              <VKRadio label="Радио 2" name="radio" value="option2" checked={radioValue === 'option2'} onChange={(e) => setRadioValue(e.target.value)} />
              <VKRadio label="Радио 3 (disabled)" name="radio" disabled />
            </VKFlex>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Слайдер
            </VKTitle>
            <VKSlider
              label="Значение"
              valueLabel={`${sliderValue}%`}
              min={0}
              max={100}
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
            />
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Аватары
            </VKTitle>
            <VKFlex direction="row" gap="m" wrap>
              <VKAvatar name="Иван Иванов" size="s" online />
              <VKAvatar name="Мария Петрова" size="m" online />
              <VKAvatar name="Алексей Сидоров" size="l" />
              <VKAvatar name="Елена Козлова" size="xl" online />
              <VKAvatar src="https://i.pravatar.cc/150?img=1" size="m" online />
            </VKFlex>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Табы
            </VKTitle>
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
              <VKText size="base" color="secondary">
                Активный таб: <strong>{activeTab}</strong>
              </VKText>
            </VKCard>
          </VKFlex>
        </VKSpacing>

        <VKSpacing size="m">
          <VKFlex direction="column" gap="m">
            <VKTitle level={4} weight="semibold">
              Модальные окна
            </VKTitle>
            <VKFlex direction="row" gap="s">
              <VKButton variant="primary" onClick={() => setModalOpen(true)}>
                Открыть модалку
              </VKButton>
              <VKButton variant="secondary" onClick={() => setDialogOpen(true)}>
                Открыть диалог
              </VKButton>
            </VKFlex>
          </VKFlex>
        </VKSpacing>

        <VKModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Пример модального окна" size="m">
          <VKFlex direction="column" gap="m">
            <VKText size="base" color="secondary">
              Это пример модального окна. Здесь может быть любой контент.
            </VKText>
            <VKFlex direction="row" justify="end" gap="s">
              <VKButton variant="secondary" onClick={() => setModalOpen(false)}>
                Отмена
              </VKButton>
              <VKButton variant="primary" onClick={() => setModalOpen(false)}>
                Подтвердить
              </VKButton>
            </VKFlex>
          </VKFlex>
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
      </VKSpacing>
    </VKContainer>
  )
}

