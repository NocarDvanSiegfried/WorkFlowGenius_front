import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VKFlex, VKText, VKInput, VKButton, VKAvatar, VKGroup, VKTitle, VKEmptyState, VKSkeleton } from '../vk'
import { taskCommentsApi } from '../../services/api'

interface TaskCommentsProps {
  taskId: number
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const [newComment, setNewComment] = useState('')
  const queryClient = useQueryClient()

  const { data: commentsData, isLoading } = useQuery({
    queryKey: ['task-comments', taskId],
    queryFn: async () => {
      const response = await taskCommentsApi.getComments(taskId)
      return response.data.data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (content: string) => {
      return await taskCommentsApi.createComment(taskId, { content })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task-comments', taskId] })
      setNewComment('')
    },
  })


  const handleSubmit = () => {
    if (newComment.trim()) {
      createMutation.mutate(newComment.trim())
    }
  }

  const comments = commentsData || []

  return (
    <VKGroup
      mode="card"
      header={
        <VKTitle level={5} weight="semibold" style={{ margin: 0 }}>
          Комментарии ({comments.length})
        </VKTitle>
      }
    >
      <VKFlex direction="column" gap="m">
        {/* Форма добавления комментария */}
        <VKFlex direction="column" gap="s">
          <VKInput
            type="text"
            placeholder="Добавить комментарий..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
          />
          <VKFlex justify="end">
            <VKButton variant="primary" size="s" onClick={handleSubmit} disabled={!newComment.trim() || createMutation.isPending}>
              Отправить
            </VKButton>
          </VKFlex>
        </VKFlex>

        {/* Список комментариев */}
        {isLoading ? (
          <VKFlex direction="column" gap="s">
            {[1, 2].map((i) => (
              <VKSkeleton key={i} width="100%" height="80px" />
            ))}
          </VKFlex>
        ) : comments.length === 0 ? (
          <VKEmptyState
            title="Нет комментариев"
            description="Будьте первым, кто оставит комментарий к этой задаче"
            icon="💬"
          />
        ) : (
          <VKFlex direction="column" gap="s">
            {comments.map((comment: any) => (
              <VKFlex key={comment.id} align="start" gap="s" style={{ padding: 'var(--vk-spacing-3)', backgroundColor: 'var(--vk-color-background-secondary)', borderRadius: 'var(--vk-radius-md)' }}>
                <VKAvatar name={comment.user?.name || 'User'} size="s" />
                <VKFlex direction="column" grow gap="s" style={{ gap: 'var(--vk-spacing-2)' }}>
                  <VKFlex justify="between" align="center">
                    <VKText size="sm" weight="medium" style={{ margin: 0 }}>
                      {comment.user?.name || 'Пользователь'}
                    </VKText>
                    <VKText size="sm" color="tertiary" style={{ margin: 0, fontSize: 'var(--vk-font-size-xs)' }}>
                      {comment.created_at ? new Date(comment.created_at).toLocaleString('ru-RU') : ''}
                    </VKText>
                  </VKFlex>
                  <VKText size="sm" color="primary" style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {comment.content}
                  </VKText>
                </VKFlex>
              </VKFlex>
            ))}
          </VKFlex>
        )}
      </VKFlex>
    </VKGroup>
  )
}

