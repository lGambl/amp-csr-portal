import { THEMES } from "../theme/themes";
import styles from "../styles/Settings.module.css";

const SWATCHES = ["--bg", "--surface", "--accent", "--green", "--red"];

function ThemePreview({ theme }) {
    return (
        <div className={styles.preview} style={theme.vars}>
            <div className={styles.previewBar}>
                <div
                    className={styles.previewDot}
                    style={{ background: "var(--accent)" }}
                />
                <div
                    className={styles.previewDot}
                    style={{ background: "var(--green)" }}
                />
                <div
                    className={styles.previewDot}
                    style={{ background: "var(--red)" }}
                />
            </div>
            <div className={styles.previewGrid}>
                <div className={styles.previewPanel}>
                    <div
                        className={`${styles.previewLine} ${styles.previewLineWide}`}
                    />
                    <div className={styles.previewLine} />
                    <div className={styles.previewButton} />
                </div>
                <div className={styles.previewPanel}>
                    <div className={styles.previewLine} />
                    <div
                        className={`${styles.previewLine} ${styles.previewLineWide}`}
                    />
                </div>
            </div>
        </div>
    );
}

export default function Settings({ themeId, onThemeChange }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Settings</h1>
                    <p className={styles.meta}>Appearance</p>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Theme</h2>
                <div className={styles.themeGrid}>
                    {THEMES.map((theme) => {
                        const active = theme.id === themeId;
                        return (
                            <button
                                key={theme.id}
                                type="button"
                                onClick={() => onThemeChange(theme.id)}
                                aria-pressed={active}
                                className={`${styles.themeCard}${active ? ` ${styles.themeCardActive}` : ""}`}
                            >
                                <div className={styles.cardHeader}>
                                    <div>
                                        <p className={styles.themeName}>
                                            {theme.name}
                                        </p>
                                        <p className={styles.themeDescription}>
                                            {theme.description}
                                        </p>
                                    </div>
                                    {active && (
                                        <span className={styles.selectedBadge}>
                                            Selected
                                        </span>
                                    )}
                                </div>

                                <div className={styles.swatchRow}>
                                    {SWATCHES.map((name) => (
                                        <div
                                            key={name}
                                            className={styles.swatch}
                                            style={{
                                                background: theme.vars[name],
                                            }}
                                        />
                                    ))}
                                </div>

                                <ThemePreview theme={theme} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
