import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { VKAnimatedCard, VKFlex, VKTitle, VKText } from '../vk'

interface AnalyticsChartProps {
  title: string
  index: number
  type: 'line' | 'bar' | 'pie'
  data: any[]
  dataKey: string
  nameKey?: string
  colors?: string[]
  className?: string
}

// VK UI Kit цвета для графиков
const defaultColors = [
  'var(--vk-color-accent-blue)', // #0077FF
  'var(--vk-color-status-negative)', // #E64646
  'var(--vk-color-status-positive)', // #4BB34B
  'var(--vk-color-status-warning)', // #FFA000
  '#4ECDC4',
  '#95E1D3',
]

export function AnalyticsChart({ title, index, type, data, dataKey, nameKey = 'name', colors = defaultColors, className = '' }: AnalyticsChartProps) {
  if (!data || data.length === 0) {
    return (
      <VKAnimatedCard
        variant="default"
        padding="l"
        index={index}
        animationType="fade-in"
        className={className}
        data-vk-card-hover
        style={{
          height: '100%',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)', height: '100%' }}>
          <VKTitle
            level={4}
            weight="semibold"
            style={{
              margin: 0,
              lineHeight: '1.4',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--vk-color-text-primary)',
            }}
          >
            {title}
          </VKTitle>
          <VKFlex
            style={{
              flex: 1,
              minHeight: '200px',
              backgroundColor: 'var(--vk-color-background-secondary)',
              borderRadius: 'var(--vk-radius-md)',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--vk-spacing-8)',
            }}
          >
            <VKText
              size="sm"
              color="secondary"
              style={{
                margin: 0,
                textAlign: 'center',
                lineHeight: '1.5',
                fontSize: '14px',
              }}
            >
              Недостаточно данных для отображения графика
            </VKText>
          </VKFlex>
        </VKFlex>
      </VKAnimatedCard>
    )
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--vk-color-border-secondary)" opacity={0.5} />
              <XAxis 
                dataKey={nameKey} 
                stroke="var(--vk-color-text-secondary)" 
                style={{ fontSize: '12px' }}
                tick={{ fill: 'var(--vk-color-text-secondary)' }}
              />
              <YAxis 
                stroke="var(--vk-color-text-secondary)" 
                style={{ fontSize: '12px' }}
                tick={{ fill: 'var(--vk-color-text-secondary)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--vk-color-background)',
                  border: '1px solid var(--vk-color-border)',
                  borderRadius: 'var(--vk-radius-md)',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={colors[0]} 
                strokeWidth={2} 
                dot={{ fill: colors[0], r: 4 }} 
                activeDot={{ r: 6 }}
                animationDuration={300}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--vk-color-border-secondary)" opacity={0.5} />
              <XAxis 
                dataKey={nameKey} 
                stroke="var(--vk-color-text-secondary)" 
                style={{ fontSize: '12px' }}
                tick={{ fill: 'var(--vk-color-text-secondary)' }}
              />
              <YAxis 
                stroke="var(--vk-color-text-secondary)" 
                style={{ fontSize: '12px' }}
                tick={{ fill: 'var(--vk-color-text-secondary)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--vk-color-background)',
                  border: '1px solid var(--vk-color-border)',
                  borderRadius: 'var(--vk-radius-md)',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar 
                dataKey={dataKey} 
                fill={colors[0]} 
                radius={[4, 4, 0, 0]} 
                animationDuration={300}
              />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--vk-color-background)',
                  border: '1px solid var(--vk-color-border)',
                  borderRadius: 'var(--vk-radius-md)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <VKAnimatedCard
      variant="default"
      padding="l"
      index={index}
      animationType="fade-in"
      className={className}
      data-vk-card-hover
      style={{
        height: '100%',
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <VKFlex direction="column" style={{ gap: 'var(--vk-spacing-6)', height: '100%' }}>
        <VKTitle
          level={4}
          weight="semibold"
          style={{
            margin: 0,
            lineHeight: '1.4',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--vk-color-text-primary)',
          }}
        >
          {title}
        </VKTitle>
        <VKFlex
          style={{
            flex: 1,
            minHeight: '200px',
            backgroundColor: 'var(--vk-color-background-secondary)',
            borderRadius: 'var(--vk-radius-md)',
            padding: 'var(--vk-spacing-4)',
          }}
        >
          {renderChart()}
        </VKFlex>
      </VKFlex>
    </VKAnimatedCard>
  )
}

