import { alpha, ThemeOptions } from '@mui/material/styles';

// Base color palette used across both light and dark modes
const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827'
};

/**
 * Returns the theme options for the Devias Kit theme based on the specified mode.
 * @param {'light' | 'dark'} mode - The color mode.
 * @returns {ThemeOptions} The theme options object for createTheme.
 */
export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => {
  // Common settings for both themes
  const commonSettings: Partial<ThemeOptions> = {
    components: {
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 0
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none'
          },
          sizeSmall: {
            padding: '6px 16px'
          },
          sizeMedium: {
            padding: '8px 20px'
          },
          sizeLarge: {
            padding: '11px 24px'
          },
          containedInherit: {
            backgroundColor: neutral[100],
            '&:hover': {
              backgroundColor: neutral[300]
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          }
        }
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: {
            variant: 'h6'
          },
          subheaderTypographyProps: {
            variant: 'body2'
          }
        },
        styleOverrides: {
          root: {
            padding: '32px 24px'
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box'
          },
          html: {
            MozOsxFontSmoothing: 'grayscale',
            WebkitFontSmoothing: 'antialiased',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          body: {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            minHeight: '100%',
            width: '100%'
          },
          '#root': {
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            height: '100%',
            width: '100%'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: mode === 'light' ? neutral[200] : neutral[700],
          }
        }
      },
      MuiTable: {
        defaultProps: { size: 'small' },
        styleOverrides: {
          root: ({ theme }) => ({
            borderCollapse: 'separate',
            borderSpacing: 0,
            backgroundColor: theme.palette.background.paper,
          }),
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
          }),
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: ({ theme }) => ({
            transition: theme.transitions.create('background-color'),
            '&:nth-of-type(odd)': {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: ({ theme }) => ({
            backgroundColor: 'transparent',
            fontWeight: 700,
            borderBottom: `2px solid ${theme.palette.divider}`,
          }),
          body: ({ theme }) => ({
            padding: theme.spacing(1.5),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'filled'
        }
      },
    },
    shape: {
      borderRadius: 8
    },
    typography: {
      button: {
        fontWeight: 600
      },
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.57
      },
      subtitle1: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.75
      },
      subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.57
      },
      overline: {
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        lineHeight: 2.5,
        textTransform: 'uppercase'
      },
      caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.66
      },
      h1: {
        fontWeight: 700,
        fontSize: '3.5rem',
        lineHeight: 1.2
      },
      h2: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.2
      },
      h3: {
        fontWeight: 700,
        fontSize: '2.25rem',
        lineHeight: 1.2
      },
      h4: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.2
      },
      h5: {
        fontWeight: 700,
        fontSize: '1.5rem',
        lineHeight: 1.2
      },
      h6: {
        fontWeight: 700,
        fontSize: '1.125rem',
        lineHeight: 1.2
      }
    },
  };

  const modeSpecificSettings: Partial<ThemeOptions> =
    mode === 'light'
      ? {
          palette: {
            mode: 'light',
            action: {
              active: neutral[500],
              focus: 'rgba(55, 65, 81, 0.12)',
              hover: 'rgba(55, 65, 81, 0.04)',
              selected: 'rgba(55, 65, 81, 0.08)',
              disabledBackground: 'rgba(55, 65, 81, 0.12)',
              disabled: 'rgba(55, 65, 81, 0.26)'
            },
            background: {
              default: '#F9FAFC',
              paper: '#FFFFFF'
            },
            divider: '#E6E8F0',
            primary: {
              main: '#6366F1',
              light: '#A5B4FC',
              dark: '#4338CA',
              contrastText: '#FFFFFF'
            },
            secondary: {
              main: '#10B981',
              light: '#34D399',
              dark: '#059669',
              contrastText: '#FFFFFF'
            },
            success: {
              main: '#14B8A6',
              light: '#43C6B7',
              dark: '#0E8074',
              contrastText: '#FFFFFF'
            },
            info: {
              main: '#2196F3',
              light: '#64B6F7',
              dark: '#0B79D0',
              contrastText: '#FFFFFF'
            },
            warning: {
              main: '#FFB020',
              light: '#FFBF4C',
              dark: '#B27B16',
              contrastText: '#FFFFFF'
            },
            error: {
              main: '#D14343',
              light: '#DA6868',
              dark: '#922E2E',
              contrastText: '#FFFFFF'
            },
            text: {
              primary: neutral[900],
              secondary: neutral[500],
              disabled: 'rgba(55, 65, 81, 0.48)'
            }
          },
          shadows: [
            'none',
            '0px 1px 2px rgba(0, 0, 0, 0.08)',
            '0px 1px 5px rgba(0, 0, 0, 0.08)',
            '0px 1px 8px rgba(0, 0, 0, 0.08)',
            '0px 1px 10px rgba(0, 0, 0, 0.08)',
            '0px 1px 14px rgba(0, 0, 0, 0.08)',
            '0px 1px 18px rgba(0, 0, 0, 0.08)',
            '0px 2px 16px rgba(0, 0, 0, 0.08)',
            '0px 3px 14px rgba(0, 0, 0, 0.08)',
            '0px 3px 16px rgba(0, 0, 0, 0.08)',
            '0px 4px 18px rgba(0, 0, 0, 0.08)',
            '0px 4px 20px rgba(0, 0, 0, 0.08)',
            '0px 5px 22px rgba(0, 0, 0, 0.08)',
            '0px 5px 24px rgba(0, 0, 0, 0.08)',
            '0px 5px 26px rgba(0, 0, 0, 0.08)',
            '0px 6px 28px rgba(0, 0, 0, 0.08)',
            '0px 6px 30px rgba(0, 0, 0, 0.08)',
            '0px 6px 32px rgba(0, 0, 0, 0.08)',
            '0px 7px 34px rgba(0, 0, 0, 0.08)',
            '0px 7px 36px rgba(0, 0, 0, 0.08)',
            '0px 8px 38px rgba(0, 0, 0, 0.08)',
            '0px 8px 40px rgba(0, 0, 0, 0.08)',
            '0px 8px 42px rgba(0, 0, 0, 0.08)',
            '0px 9px 44px rgba(0, 0, 0, 0.08)',
            '0px 9px 46px rgba(0, 0, 0, 0.08)',
          ],
        }
      : {
          // Dark mode settings
          palette: {
            mode: 'dark',
            action: {
              active: neutral[400],
              focus: 'rgba(255, 255, 255, 0.12)',
              hover: 'rgba(255, 255, 255, 0.04)',
              selected: 'rgba(255, 255, 255, 0.08)',
              disabledBackground: 'rgba(255, 255, 255, 0.12)',
              disabled: 'rgba(255, 255, 255, 0.26)'
            },
            background: {
              default: '#111827',
              paper: '#1F2937'
            },
            divider: '#2D3748',
            primary: {
              main: '#7582EB',
              light: '#A5B4FC',
              dark: '#4338CA',
              contrastText: '#FFFFFF'
            },
            secondary: {
              main: '#10B981',
              light: '#34D399',
              dark: '#059669',
              contrastText: '#FFFFFF'
            },
            success: {
              main: '#14B8A6',
              light: '#43C6B7',
              dark: '#0E8074',
              contrastText: '#FFFFFF'
            },
            info: {
              main: '#2196F3',
              light: '#64B6F7',
              dark: '#0B79D0',
              contrastText: '#FFFFFF'
            },
            warning: {
              main: '#FFB020',
              light: '#FFBF4C',
              dark: '#B27B16',
              contrastText: '#FFFFFF'
            },
            error: {
              main: '#D14343',
              light: '#DA6868',
              dark: '#922E2E',
              contrastText: '#FFFFFF'
            },
            text: {
              primary: '#EDF2F7',
              secondary: '#A0AEC0',
              disabled: 'rgba(255, 255, 255, 0.48)'
            }
          },
          shadows: [
            'none',
            '0px 1px 2px rgba(0, 0, 0, 0.08)',
            '0px 1px 5px rgba(0, 0, 0, 0.08)',
            '0px 1px 8px rgba(0, 0, 0, 0.08)',
            '0px 1px 10px rgba(0, 0, 0, 0.08)',
            '0px 1px 14px rgba(0, 0, 0, 0.08)',
            '0px 1px 18px rgba(0, 0, 0, 0.08)',
            '0px 2px 16px rgba(0, 0, 0, 0.08)',
            '0px 3px 14px rgba(0, 0, 0, 0.08)',
            '0px 3px 16px rgba(0, 0, 0, 0.08)',
            '0px 4px 18px rgba(0, 0, 0, 0.08)',
            '0px 4px 20px rgba(0, 0, 0, 0.08)',
            '0px 5px 22px rgba(0, 0, 0, 0.08)',
            '0px 5px 24px rgba(0, 0, 0, 0.08)',
            '0px 5px 26px rgba(0, 0, 0, 0.08)',
            '0px 6px 28px rgba(0, 0, 0, 0.08)',
            '0px 6px 30px rgba(0, 0, 0, 0.08)',
            '0px 6px 32px rgba(0, 0, 0, 0.08)',
            '0px 7px 34px rgba(0, 0, 0, 0.08)',
            '0px 7px 36px rgba(0, 0, 0, 0.08)',
            '0px 8px 38px rgba(0, 0, 0, 0.08)',
            '0px 8px 40px rgba(0, 0, 0, 0.08)',
            '0px 8px 42px rgba(0, 0, 0, 0.08)',
            '0px 9px 44px rgba(0, 0, 0, 0.08)',
            '0px 9px 46px rgba(0, 0, 0, 0.08)',
          ],
        };

  return { ...commonSettings, ...modeSpecificSettings };
};