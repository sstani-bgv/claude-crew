# crew

A Claude Code mod: a sidebar of pixel crabs, one per subagent, and a progress strip above the prompt.

- **Agents panel** (`/agents-info` toggles it): running and finished subagents with model, effort, steps, context, tokens and time. Working crabs walk, and each costume animates its prop.
- **Costume by task**: builder (racer with a flag), designer (chef), researcher (hard hat), reviewer (detective), planner (astronaut), Explore (pirate), director (video, scenes, shorts), miner (transcripts, extraction), hunter (hooks, teasers), scientist (tests, verification), guard (security).
- **Codex**: every `codex exec` run in the shell shows up as its own row with OpenAI's blue cloud bot.
- **Strip above the prompt**: tasks done out of started, with a dithered pixel bar; `×N` opens the panel, `✕` hides the strip. With the panel closed, a small crab button brings it back.

Based on [savvy-progress](https://github.com/johnnyvizz/claude-kit/tree/main/plugins/savvy-progress) by johnnyvizz (MIT): its panel, crabs and strip, plus the costumes and the Codex pet above. Cost per row is an estimate from token counts and a built-in price table.

## Install

In a Claude Code terminal session:

```
/plugin install crew --marketplace sstani-bgv/claude-crew
```

Answer `y` to add the marketplace, then pick the user scope.

## Settings

`language`: `auto` (default), `en` or `ru`.
