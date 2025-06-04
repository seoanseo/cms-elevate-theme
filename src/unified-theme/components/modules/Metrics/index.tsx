import { ModuleMeta } from '../../types/modules.js';
import { TextFieldType } from '@hubspot/cms-components/fields';
import { SectionVariantType } from '../../types/fields.js';
import { styled } from 'styled-components';
import StyledComponentsRegistry from '../../StyledComponentsRegistry/StyledComponentsRegistry.jsx';
import chartIconSvg from './assets/chart.svg';
import { SectionStyleFieldLibraryType } from '../../fieldLibrary/SectionStyle/types.js';
import { HeadingStyleFieldLibraryType, HeadingStyleVariant } from '../../fieldLibrary/HeadingStyle/types.js';
import { sectionColorsMap } from '../../utils/section-color-map.js';

type GroupStyle = SectionStyleFieldLibraryType & HeadingStyleFieldLibraryType;

type MetricProps = {
  groupMetrics: {
    metric: TextFieldType['default'];
    description: TextFieldType['default'];
  }[];
  groupStyle: GroupStyle;
};

// Metrics component

// Functions to pull in corresponding CSS variables on component based on field values

type CSSPropertiesMap = { [key: string]: string };

function generateColorCssVars(sectionVariantField: SectionVariantType): CSSPropertiesMap {
  return {
    '--hsElevate--metrics__textColor': sectionColorsMap[sectionVariantField].textColor,
    '--hsElevate--metrics__accentColor': sectionColorsMap[sectionVariantField].accentColor,
  };
}

// Based on the heading style a user selects for the metric number, we set a maximum font size and a minimum font size which is used for a font-size clamp on the MetricNumber component
function generateMetricCssVars(headingStyleAs: HeadingStyleVariant): CSSPropertiesMap {
  const metricCssVarsMap = {
    display_1: 'var(--hsElevate--display1__fontSize)',
    display_2: 'var(--hsElevate--display2__fontSize)',
    h1: 'var(--hsElevate--h1__fontSize)',
    h2: 'var(--hsElevate--h2__fontSize)',
    h3: 'var(--hsElevate--h3__fontSize)',
    h4: 'var(--hsElevate--h4__fontSize)',
    h5: 'var(--hsElevate--h5__fontSize)',
    h6: 'var(--hsElevate--h6__fontSize)',
  };

  return {
    '--hsElevate--metrics__maxFontSize': metricCssVarsMap[headingStyleAs],
    '--hsElevate--metrics__minFontSize': `calc(var(--hsElevate--metrics__maxFontSize) * var(--hsElevate--heading__tablet-modifier))`,
  };
}

const MetricsWrapper = styled.div`
  container-type: inline-size;
`;

// Helper function to get metric container query breakpoints based on number of metrics in the repeater
function getMetricBreakpoints(metricCount: number) {
  const metricBreakpointsAsMap = {
    2: [{ minWidth: 700, gap: 'var(--hsElevate--spacing--24, 24px)', columns: 2 }],
    3: [{ minWidth: 900, gap: 'var(--hsElevate--spacing--24, 24px)', columns: 3 }],
    4: [
      { minWidth: 700, gap: 'var(--hsElevate--spacing--24, 24px)', columns: 2 }, // 2x2 grid
      { minWidth: 950, gap: 'var(--hsElevate--spacing--16, 16px)', columns: 4 }, // Single row
    ],
  };

  return metricBreakpointsAsMap[metricCount] || [];
}

const MetricsContainer = styled.div<{ $metricCount: number }>`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--hsElevate--spacing--32, 32px);

  /* Sets grid template columns and gaps using container queries based on the number of metrics in the repeater to ensure mobile responsiveness */
  ${props => {
    const breakpoints = getMetricBreakpoints(props.$metricCount);

    return breakpoints
      .map(
        breakpoint => `
      @container (min-width: ${breakpoint.minWidth}px) {
        grid-template-columns: repeat(${breakpoint.columns}, 1fr);
        gap: ${breakpoint.gap};
      }
    `
      )
      .join('');
  }}
`;

const Metric = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
`;

const MetricNumber = styled.div`
  color: var(--hsElevate--metrics__accentColor);
  max-width: 100%;
  text-align: center;
  font-size: var(--hsElevate--metrics__minFontSize);
  line-height: var(--hsElevate--heading__lineHeight);

  /* Dynamically sizes down the font size for the metric number based on the viewport width */
  @media (min-width: 768px) {
    font-size: clamp(var(--hsElevate--metrics__minFontSize), calc(1vw + var(--hsElevate--metrics__minFontSize)), var(--hsElevate--metrics__maxFontSize));
  }
`;

const MetricDescription = styled.div`
  color: var(--hsElevate--metrics__textColor);
  max-width: 100%;
  text-align: center;
`;

export const Component = (props: MetricProps) => {
  const {
    groupMetrics,
    groupStyle: { headingStyleVariant, sectionStyleVariant },
  } = props;

  const cssVarsMap = {
    ...generateColorCssVars(sectionStyleVariant),
    ...generateMetricCssVars(headingStyleVariant),
  };

  return (
    <StyledComponentsRegistry>
      <MetricsWrapper>
        <MetricsContainer className="hs-elevate-metrics-container" style={cssVarsMap} $metricCount={groupMetrics.length}>
          {groupMetrics.map((metric, index) => {
            return (
              <Metric className="hs-elevate-metrics-container__metric" key={index}>
                <MetricNumber className="hs-elevate-metrics-container__metric-number">{metric.metric}</MetricNumber>
                <MetricDescription className="hs-elevate-metrics-container__metric-description">{metric.description}</MetricDescription>
              </Metric>
            );
          })}
        </MetricsContainer>
      </MetricsWrapper>
    </StyledComponentsRegistry>
  );
};

export { fields } from './fields.js';

export const meta: ModuleMeta = {
  label: 'Metrics',
  content_types: ['BLOG_LISTING', 'BLOG_POST', 'SITE_PAGE', 'LANDING_PAGE'],
  icon: chartIconSvg,
  categories: ['text'],
};

export const defaultModuleConfig = {
  moduleName: 'elevate/components/modules/metrics',
  version: 0,
  themeModule: true,
};
