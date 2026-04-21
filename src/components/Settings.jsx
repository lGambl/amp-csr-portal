import { Box, Button, Typography } from "@mui/material";
import { THEMES } from "../theme/themes";
import { sx } from "../styles/settings.styles";

const SWATCHES = ["--bg", "--surface", "--accent", "--green", "--red"];

function ThemePreview({ theme }) {
  return (
    <Box sx={sx.preview(theme.vars)}>
      <Box sx={sx.previewBar}>
        <Box sx={sx.previewDot("var(--accent)")} />
        <Box sx={sx.previewDot("var(--green)")} />
        <Box sx={sx.previewDot("var(--red)")} />
      </Box>
      <Box sx={sx.previewGrid}>
        <Box sx={sx.previewPanel}>
          <Box sx={sx.previewLine(true)} />
          <Box sx={sx.previewLine(false)} />
          <Box sx={sx.previewButton} />
        </Box>
        <Box sx={sx.previewPanel}>
          <Box sx={sx.previewLine(false)} />
          <Box sx={sx.previewLine(true)} />
        </Box>
      </Box>
    </Box>
  );
}

export default function Settings({ themeId, onThemeChange, onBackToCustomers }) {
  return (
    <Box sx={sx.wrapper}>
      <Box sx={sx.header}>
        <Box>
          <Typography sx={sx.title}>Settings</Typography>
          <Typography sx={sx.meta}>Theme</Typography>
        </Box>
      </Box>

      <Box sx={sx.section}>
        <Typography sx={sx.sectionTitle}>Theme</Typography>
        <Box sx={sx.themeGrid}>
          {THEMES.map((theme) => {
            const active = theme.id === themeId;

            return (
              <Box
                key={theme.id}
                component="button"
                type="button"
                onClick={() => onThemeChange(theme.id)}
                aria-pressed={active}
                sx={sx.themeCard(active)}
              >
                <Box sx={sx.cardHeader}>
                  <Box>
                    <Typography sx={sx.themeName}>{theme.name}</Typography>
                    <Typography sx={sx.themeDescription}>
                      {theme.description}
                    </Typography>
                  </Box>
                  {active && (
                    <Typography component="span" sx={sx.selectedBadge}>
                      Selected
                    </Typography>
                  )}
                </Box>

                <Box sx={sx.swatchRow}>
                  {SWATCHES.map((name) => (
                    <Box key={name} sx={sx.swatch(theme.vars[name])} />
                  ))}
                </Box>

                <ThemePreview theme={theme} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
