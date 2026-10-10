import { expect, mock, test } from 'claude-code/testing'

test('a plain subagent gets a costume, a row in the panel and the strip above the prompt', async ($, on) => {
  mock.clock(on)
  on('agent.spawn', () => ({ model: 'claude-haiku-5-5', agentId: 'a1' }))
  // Another mod's strip beneath ours: it must stay visible.
  on('ui.render', { component: 'AbovePrompt' }, ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text key="other-mod">other mod's strip</Text>
  })
  await $.agent.spawn({ prompt: 'go', description: 'Research competitor launches', subagentType: 'general-purpose' } as never)

  const pane = await $.ui.mount({ plugin: 'crew', surface: 'desktop', component: 'Pane', props: { bodyColumns: 50 } as never, requestId: 'savvy-agents' })
  const row = await pane.find({ type: 'Svg' as never, text: /Research competitor launches/ } as never)
  const all = JSON.stringify(await pane.drawn())
  expect(all).toContain('researcher')
  expect(all).toContain('Research competitor launches')
  void row

  const band = await $.ui.mount({ plugin: 'crew', surface: 'desktop', component: 'AbovePrompt', props: { hasSurvey: false, bodyColumns: 120 } as never })
  const drawn = JSON.stringify(await band.drawn())
  expect(drawn).toContain('Tasks 0/1')
  expect(drawn).toContain("other mod's strip")

  const term = await $.ui.mount({ plugin: 'crew', surface: 'terminal', component: 'Pane', props: { bodyColumns: 50 } as never, requestId: 'savvy-agents' })
  expect(await term.find({ type: 'Text', text: /researcher/ })).toBeDefined()
})

test('with the panel closed and nothing running, the strip offers a button to reopen it', async ($, on) => {
  mock.clock(on)
  on('agent.spawn', () => ({ model: 'claude-haiku-5-5', agentId: 'a2' }))
  on('ui.panes', () => ({ value: [] }))
  on('ui.render', { component: 'AbovePrompt' }, ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text key="engine">engine</Text>
  })
  await $.agent.spawn({ prompt: 'go', description: 'Build a thing', subagentType: 'general-purpose' } as never)
  const strip = await $.ui.mount({ plugin: 'crew', surface: 'desktop', component: 'AbovePrompt', props: { hasSurvey: false, bodyColumns: 120 } as never })
  await strip.press({ key: 'savvy-dismiss' })
  expect(await strip.find({ key: 'crew-reopen' })).toBeDefined()
  await strip.press({ key: 'crew-reopen-hide' })
  expect(await strip.find({ key: 'crew-reopen' })).toBeUndefined()
})
