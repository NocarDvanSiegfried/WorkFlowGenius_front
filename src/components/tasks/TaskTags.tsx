import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKInput, VKButton, VKTag, VKGroup, VKTitle, VKSelect, VKEmptyState, VKTooltip } from '../vk'
import { taskTagsApi } from '../../services/api'

interface TaskTagsProps {
  taskId: number
}

const tagColors = [
  { value: 'blue', label: 'Синий' },
  { value: 'green', label: 'Зеленый' },
  { value: 'red', label: 'Красный' },
  { value: 'orange', label: 'Оранжевый' },
  { value: 'purple', label: 'Фиолетовый' },
]

export function TaskTags({ taskId }: TaskTagsProps) {
  const [newTagName, setNewTagName] = useState('')
  const [selectedColor, setSelectedColor] = useState('blue')
  const [isAdding, setIsAdding] = useState(false)
  const queryClient = useQueryClient()

  const { data: tagsData } = useQuery({
    queryKey: ['task-tags', taskId],
    queryFn: async () => {
      const response = await taskTagsApi.getTags(taskId)
      return response.data.data
    },
  })

  const addMutation = useMutation({
    mutationFn: async (data: { tag_name: string; color: string }) => {
      return await taskTagsApi.addTag(taskId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-tags', taskId] })
      setNewTagName('')
      setIsAdding(false)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (tagId: number) => {
      return await taskTagsApi.deleteTag(taskId, tagId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-tags', taskId] })
    },
  })

  const handleAddTag = () => {
    if (newTagName.trim()) {
      addMutation.mutate({ tag_name: newTagName.trim(), color: selectedColor })
    }
  }

  const tags = tagsData || []

  return (
    <VKGroup
      mode="card"
      header={
        <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
          Теги
        </VKTitle>
      }
    >
      <VKFlex direction="column" gap="m">
        {/* Существующие теги */}
        {tags.length > 0 ? (
          <VKFlex gap="s" style={{ flexWrap: 'wrap' }}>
            {tags.map((tag: any) => (
              <VKTag key={tag.id} variant="primary" style={{ backgroundColor: `var(--vk-color-${tag.color || 'blue'}-alpha)` }}>
                {tag.tag_name}
                <VKTooltip content="Удалить тег">
                  <VKButton
                    variant="tertiary"
                    size="s"
                    onClick={() => deleteMutation.mutate(tag.id)}
                    style={{ marginLeft: 'var(--vk-spacing-2)', padding: '0', minWidth: 'auto', height: 'auto' }}
                    aria-label="Удалить тег"
                  >
                    ×
                  </VKButton>
                </VKTooltip>
              </VKTag>
            ))}
          </VKFlex>
        ) : (
          <VKEmptyState
            title="Нет тегов"
            description="Добавьте теги для лучшей организации задач"
            icon="🏷️"
            style={{ padding: 'var(--vk-spacing-4)' }}
          />
        )}

        {/* Форма добавления тега */}
        {isAdding ? (
          <VKFlex direction="column" gap="s">
            <VKInput
              type="text"
              placeholder="Название тега"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddTag()
                } else if (e.key === 'Escape') {
                  setIsAdding(false)
                  setNewTagName('')
                }
              }}
            />
            <VKSelect
              options={tagColors}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
            <VKFlex gap="s">
              <VKButton variant="primary" size="s" onClick={handleAddTag} disabled={!newTagName.trim()}>
                Добавить
              </VKButton>
              <VKButton variant="secondary" size="s" onClick={() => {
                setIsAdding(false)
                setNewTagName('')
              }}>
                Отмена
              </VKButton>
            </VKFlex>
          </VKFlex>
        ) : (
          <VKButton variant="tertiary" size="s" onClick={() => setIsAdding(true)}>
            + Добавить тег
          </VKButton>
        )}
      </VKFlex>
    </VKGroup>
  )
}

