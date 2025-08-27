import { StyleSheet } from 'react-native';

export const analyticsStyles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(3,8,23,0.55)', // slight overlay for contrast on the wave
  },
  scrollBody: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.3,
  },

  // Cards / containers
  card: {
    backgroundColor: 'rgba(16,26,51,0.92)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.15)',
  },
  cardTitle: {
    color: '#e5e7eb',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
  chart: {
    borderRadius: 12,
  },

  // Empty state
  emptyState: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(10,17,36,0.75)',
  },
  emptyText: {
    color: '#9ca3af',
  },

  // Optional KPI chips (if you add them later)
  kpiRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  kpi: {
    flex: 1,
    backgroundColor: 'rgba(16,26,51,0.92)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.15)',
  },
  kpiLabel: {
    color: '#94a3b8',
    fontSize: 12,
  },
  kpiValue: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
});
