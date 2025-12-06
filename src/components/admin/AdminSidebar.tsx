import { VKFlex, VKTitle, VKText, VKProgress, VKAnimatedCard, VKAvatar, VKGroup } from '../vk'
import type { EmployeeLoad, AIAnalysis } from '../../types/admin'

interface AdminSidebarProps {
  employeeLoads: EmployeeLoad[]
  aiAnalysis?: AIAnalysis
}

export function AdminSidebar({ employeeLoads, aiAnalysis }: AdminSidebarProps) {
  return (
    <VKFlex direction="column" style={{ width: '100%', flexShrink: 0, gap: 'var(--vk-spacing-8)' }}>
      <VKGroup
        mode="card"
        header={
          <VKTitle level={5} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '16px', fontWeight: 600 }}>
            Загрузка сотрудников
          </VKTitle>
        }
        style={{
          animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
          opacity: 0,
          width: '100%',
          marginBottom: aiAnalysis ? 'var(--vk-spacing-8)' : 0,
          overflow: 'hidden',
        }}
      >
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-8)' }}>
          {employeeLoads.map((employee, index) => (
            <VKAnimatedCard
              key={`${employee.name}-${index}`}
              variant="default"
              padding="m"
              index={index}
              animationType="slide-up"
              data-vk-card-hover-admin
              style={{
                overflow: 'hidden',
                border: '1px solid var(--vk-color-border-secondary)',
                borderRadius: 'var(--vk-radius-lg)',
                boxShadow: 'var(--vk-shadow-elevation-1)',
                transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
              }}
            >
              <VKFlex direction="row" align="center" justify="between" style={{ gap: 'var(--vk-spacing-4)', width: '100%' }}>
                <VKFlex direction="row" align="center" style={{ gap: 'var(--vk-spacing-3)', flex: 1, minWidth: 0 }}>
                  <VKAvatar name={employee.name} size="m" />
                  <VKText
                    size="base"
                    weight="medium"
                    style={{
                      lineHeight: 'var(--vk-line-height-relaxed)',
                      color: 'var(--vk-color-text-primary)',
                      fontSize: 'var(--vk-font-size-sm)',
                      fontWeight: 'var(--vk-font-weight-medium)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      transition: 'color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                    }}
                  >
                    {employee.name}
                  </VKText>
                </VKFlex>
                <VKFlex direction="column" align="end" style={{ gap: 'var(--vk-spacing-2)', flexShrink: 0 }}>
                  <VKText
                    size="sm"
                    color="secondary"
                    style={{
                      lineHeight: 'var(--vk-line-height-normal)',
                      fontSize: 'var(--vk-font-size-xs)',
                      fontWeight: 'var(--vk-font-weight-medium)',
                      transition: 'color var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                    }}
                  >
                    {employee.load}/{employee.maxLoad}
                  </VKText>
                  <VKProgress
                    value={employee.load}
                    max={employee.maxLoad}
                    size="s"
                    variant="accent"
                    style={{ width: '80px', minWidth: '80px' }}
                  />
                </VKFlex>
              </VKFlex>
            </VKAnimatedCard>
          ))}
        </VKFlex>
      </VKGroup>

      {aiAnalysis && (
            <VKGroup
              mode="card"
              header={
                <VKTitle level={5} weight="semibold" style={{ margin: 0, lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word', fontSize: '16px', fontWeight: 600 }}>
                  AI Аналитика
                </VKTitle>
              }
              style={{
                animation: 'vk-fade-in var(--vk-motion-duration-base) var(--vk-motion-easing-standard) forwards',
                animationDelay: '120ms',
                opacity: 0,
                width: '100%',
                overflow: 'hidden',
              }}
            >
          <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-4)' }}>
            <VKFlex justify="between" align="center">
              <VKText size="sm" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                Рекомендации
              </VKText>
              <VKText size="sm" weight="medium" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {aiAnalysis.recommendations}
              </VKText>
            </VKFlex>
            <VKFlex justify="between" align="center">
              <VKText size="sm" color="secondary" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                Применено
              </VKText>
              <VKText size="sm" weight="medium" style={{ margin: 0, lineHeight: '1.6', wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {aiAnalysis.applied}
              </VKText>
            </VKFlex>
            <VKProgress
              value={aiAnalysis.applied}
              max={aiAnalysis.recommendations}
              size="s"
              variant="accent"
            />
          </VKFlex>
        </VKGroup>
      )}
    </VKFlex>
  )
}
