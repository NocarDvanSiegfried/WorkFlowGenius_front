import { useState } from 'react'
import { VKAnimatedCard, VKFlex, VKTitle, VKText, VKButton, VKBadge } from '../vk'
import { useQuery } from '@tanstack/react-query'
import { teamDnaApi } from '../../services/api'

interface Connection {
  user1_id: number
  user2_id: number
  user1_name: string
  user2_name: string
  connection_strength: number
  connection_type: string
  synergy_score: number
}

export function TeamDNAGraph() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const { data: connectionsData } = useQuery({
    queryKey: ['team-dna-connections', selectedUserId],
    queryFn: async () => {
      if (selectedUserId) {
        const response = await teamDnaApi.getUserConnections(selectedUserId)
        return response.data.data as Connection[]
      }
      // Получаем все связи и преобразуем их в нужный формат
      const response = await teamDnaApi.getConnections()
      const graphData = response.data.data
      if (graphData?.edges && graphData?.nodes) {
        // Преобразуем формат графа в формат связей
        const nodeMap = new Map(graphData.nodes.map((n: any) => [n.id, n.name]))
        return graphData.edges.map((edge: any) => ({
          user1_id: parseInt(edge.source),
          user2_id: parseInt(edge.target),
          user1_name: nodeMap.get(edge.source) || `User ${edge.source}`,
          user2_name: nodeMap.get(edge.target) || `User ${edge.target}`,
          connection_strength: edge.strength,
          connection_type: edge.type,
          synergy_score: 0,
        })) as Connection[]
      }
      return []
    },
    enabled: true,
  })

  const connections = connectionsData || []

  // Простая визуализация графа связей
  const renderGraph = () => {
    if (connections.length === 0) {
      return (
        <VKFlex
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--vk-color-background-secondary)',
            borderRadius: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 'var(--vk-spacing-4)',
          }}
        >
          <VKText size="base" color="tertiary" style={{ fontSize: '48px', margin: 0 }}>
            👥
          </VKText>
          <VKText size="base" color="secondary" style={{ textAlign: 'center', margin: 0 }}>
            Нет данных о связях между сотрудниками
          </VKText>
        </VKFlex>
      )
    }

    // Группируем связи по пользователям
    const userNodes = new Set<number>()
    connections.forEach((conn) => {
      userNodes.add(conn.user1_id)
      userNodes.add(conn.user2_id)
    })

    const nodes = Array.from(userNodes).map((id) => {
      const userConnections = connections.filter(
        (c) => c.user1_id === id || c.user2_id === id
      )
      const avgStrength = userConnections.reduce((sum, c) => sum + c.connection_strength, 0) / userConnections.length
      return {
        id,
        name: userConnections[0]?.user1_id === id ? userConnections[0].user1_name : userConnections[0]?.user2_name || `User ${id}`,
        strength: avgStrength,
        connections: userConnections.length,
      }
    })

    return (
      <VKFlex
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--vk-color-background-secondary)',
          borderRadius: 'var(--vk-radius-lg)',
          padding: 'var(--vk-spacing-6)',
          flexDirection: 'column',
          gap: 'var(--vk-spacing-6)',
          overflow: 'auto',
        }}
      >
        <VKFlex 
          style={{ 
            flexWrap: 'wrap', 
            gap: 'var(--vk-spacing-4)', 
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {nodes.map((node) => (
            <VKButton
              key={node.id}
              variant={selectedUserId === node.id ? 'primary' : 'tertiary'}
              size="m"
              onClick={() => setSelectedUserId(selectedUserId === node.id ? null : node.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--vk-spacing-2)',
                padding: 'var(--vk-spacing-4)',
                minWidth: '140px',
                transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                transform: selectedUserId === node.id ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <VKText 
                size="base" 
                weight="semibold" 
                style={{ 
                  margin: 0, 
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                {node.name.split(' ')[0]}
              </VKText>
              <VKBadge 
                variant={node.strength > 0.7 ? 'success' : node.strength > 0.4 ? 'warning' : 'default'}
                style={{
                  fontSize: '11px',
                }}
              >
                {node.connections} связей
              </VKBadge>
            </VKButton>
          ))}
        </VKFlex>

        {selectedUserId && (
          <VKFlex 
            direction="column" 
            style={{ 
              gap: 'var(--vk-spacing-4)', 
              marginTop: 'var(--vk-spacing-6)',
              width: '100%',
            }}
          >
            <VKTitle 
              level={4} 
              weight="semibold" 
              style={{ 
                margin: 0,
                fontSize: '16px',
                lineHeight: '1.4',
              }}
            >
              Связи выбранного сотрудника:
            </VKTitle>
            <VKFlex 
              direction="column" 
              style={{ 
                gap: 'var(--vk-spacing-3)',
                width: '100%',
              }}
            >
              {connections
                .filter((c) => c.user1_id === selectedUserId || c.user2_id === selectedUserId)
                .map((conn, idx) => {
                  const otherUser = conn.user1_id === selectedUserId ? conn.user2_name : conn.user1_name
                  return (
                    <VKAnimatedCard
                      key={idx}
                      variant="outlined"
                      padding="m"
                      index={idx}
                      animationType="fade-in"
                      data-vk-card-hover
                      style={{
                        border: '1px solid var(--vk-color-border)',
                        borderRadius: 'var(--vk-radius-md)',
                        transition: 'all var(--vk-motion-duration-base) var(--vk-motion-easing-standard)',
                      }}
                    >
                      <VKFlex justify="between" align="center" style={{ gap: 'var(--vk-spacing-4)' }}>
                        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-2)', flex: 1 }}>
                          <VKText 
                            size="base" 
                            weight="semibold" 
                            style={{ 
                              margin: 0,
                              fontSize: '15px',
                              lineHeight: '1.4',
                            }}
                          >
                            {otherUser}
                          </VKText>
                          <VKText 
                            size="sm" 
                            color="secondary" 
                            style={{ 
                              margin: 0,
                              fontSize: '13px',
                            }}
                          >
                            Тип связи: {conn.connection_type === 'strong' ? 'Сильная' : conn.connection_type === 'normal' ? 'Обычная' : 'Слабая'}
                          </VKText>
                        </VKFlex>
                        <VKFlex 
                          direction="column" 
                          align="end" 
                          style={{ 
                            gap: 'var(--vk-spacing-2)',
                            flexShrink: 0,
                          }}
                        >
                          <VKBadge 
                            variant={conn.connection_strength > 0.7 ? 'success' : conn.connection_strength > 0.4 ? 'warning' : 'default'}
                            style={{
                              fontSize: '12px',
                              padding: 'var(--vk-spacing-1) var(--vk-spacing-2)',
                            }}
                          >
                            {Math.round(conn.connection_strength * 100)}%
                          </VKBadge>
                          <VKText 
                            size="sm" 
                            color="secondary" 
                            style={{ 
                              margin: 0,
                              fontSize: '12px',
                            }}
                          >
                            Синергия: {conn.synergy_score > 0 ? conn.synergy_score.toFixed(1) : '0.0'}/10
                          </VKText>
                        </VKFlex>
                      </VKFlex>
                    </VKAnimatedCard>
                  )
                })}
            </VKFlex>
          </VKFlex>
        )}
      </VKFlex>
    )
  }

  return (
    <VKAnimatedCard mode="shadow" padding="l" index={5} animationType="slide-up">
      <VKFlex direction="column" gap="m">
        <VKTitle level={3} weight="semibold" style={{ margin: 0 }}>
          Граф командных связей
        </VKTitle>
        <VKText 
          size="sm" 
          color="secondary" 
          style={{ 
            margin: 0,
            fontSize: '13px',
            lineHeight: '1.5',
          }}
        >
          {selectedUserId ? 'Нажмите на сотрудника еще раз, чтобы сбросить выбор' : 'Нажмите на узел графа, чтобы увидеть детали связей'}
        </VKText>
        <VKFlex
          style={{
            width: '100%',
            height: '500px',
            minHeight: '500px',
          }}
        >
          {renderGraph()}
        </VKFlex>
      </VKFlex>
    </VKAnimatedCard>
  )
}

