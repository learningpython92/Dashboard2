const API_BASE_URL = 'http://localhost:8000/api/v1';

/**
 * Helper to build query parameters, ignoring null/empty values.
 * @param {Record<string, any>} filters
 * @returns {URLSearchParams}
 */
function buildQueryParams(filters) {
    const params = new URLSearchParams();
    for (const key in filters) {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
            params.append(key, filters[key]);
        }
    }
    return params;
}

/**
 * Fetches the aggregated KPI averages for the main dashboard.
 * GET /kpis/averages/
 * @param {object} filters - { business_group, function, start_date, end_date }
 * @returns {Promise<object>}
 */
export async function getKpiAverages(filters) {
    const params = buildQueryParams(filters);
    const response = await fetch(`${API_BASE_URL}/kpis/averages/?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch KPI averages');
    return response.json();
}

/**
 * Fetches business summary data (for headcount).
 * GET /summaries/
 * @returns {Promise<Array<object>>}
 */
export async function getBusinessSummaries() {
    const response = await fetch(`${API_BASE_URL}/summaries/`);
    if (!response.ok) throw new Error('Failed to fetch business summaries');
    return response.json();
}

/**
 * Fetches AI-driven insights for the main dashboard.
 * GET /insights/deep-dive/
 * @param {object} filters - { business_group, function, start_date, end_date }
 * @returns {Promise<object>}
 */
export async function getAiInsights(filters) {
    const params = buildQueryParams(filters);
    const response = await fetch(`${API_BASE_URL}/insights/deep-dive/?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch AI insights');
    return response.json();
}

/**
 * Fetches all data needed for a KPI drilldown view.
 * GET /kpis/drilldown/{kpi_name}
 * @param {string} kpiName - The snake_case name of the KPI (e.g., 'time_to_fill').
 * @param {object} filters - { business_group, function }
 * @returns {Promise<object>}
 */
export async function getKpiDrilldown(kpiName, filters) {
    const params = buildQueryParams(filters);
    const response = await fetch(`${API_BASE_URL}/kpis/drilldown/${kpiName}?${params.toString()}`);
    if (!response.ok) throw new Error(`Failed to fetch drilldown for ${kpiName}`);
    return response.json();
}

/**
 * Fetches the unique filter values for populating dropdowns.
 * GET /filters/business-groups and /filters/functions
 * @returns {Promise<{businessGroups: string[], functions: string[]}>}
 */
export async function getFilterOptions() {
    const [bgResponse, funcResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/filters/business-groups`),
        fetch(`${API_BASE_URL}/filters/functions`)
    ]);
    if (!bgResponse.ok || !funcResponse.ok) throw new Error('Failed to fetch filter options');
    const businessGroups = await bgResponse.json();
    const functions = await funcResponse.json();
    return { businessGroups, functions };
}
