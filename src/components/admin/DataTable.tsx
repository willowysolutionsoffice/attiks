'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, Edit2, Trash2, Plus } from 'lucide-react';
import Image from 'next/image';
import StatusBadge from './StatusBadge';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: 'image' | 'badge' | 'truncate' | ((row: T) => React.ReactNode);
  width?: string;
}

interface Props<T extends { id: string }> {
  title: string;
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  addLabel?: string;
  pageSize?: number;
}

function getCellValue<T>(row: T, key: string): unknown {
  return (row as Record<string, unknown>)[key];
}

export default function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  loading = false,
  onAdd,
  onEdit,
  onDelete,
  addLabel = 'Add New',
  pageSize = 10,
}: Props<T>) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  // Filter
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      Object.values(row as object).some((v) =>
        String(v ?? '').toLowerCase().includes(q)
      )
    );
  }, [data, search]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(getCellValue(a, sortKey) ?? '');
      const bv = String(getCellValue(b, sortKey) ?? '');
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  function renderCell(col: Column<T>, row: T) {
    const val = getCellValue(row, col.key as string);

    if (typeof col.render === 'function') {
      return col.render(row);
    }

    if (col.render === 'image') {
      return typeof val === 'string' && val ? (
        <Image
          src={val}
          alt=""
          width={56}
          height={36}
          className="admin-table-img"
          style={{ objectFit: 'cover' }}
        />
      ) : (
        <div
          style={{
            width: 56, height: 36,
            background: 'var(--admin-surface-2)',
            borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '0.6rem', color: 'var(--admin-text-muted)' }}>no img</span>
        </div>
      );
    }

    if (col.render === 'badge') {
      return <StatusBadge value={String(val ?? '')} />;
    }

    if (col.render === 'truncate') {
      const s = String(val ?? '');
      return (
        <span title={s} style={{ display: 'block', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {s}
        </span>
      );
    }

    return <span>{String(val ?? '')}</span>;
  }

  // Skeleton rows
  if (loading) {
    return (
      <div className="admin-table-wrap">
        <div className="admin-table-toolbar">
          <div className="admin-skeleton" style={{ width: 120, height: 20 }} />
        </div>
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="admin-skeleton" style={{ height: 42, width: '100%' }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-table-wrap">
      {/* Toolbar */}
      <div className="admin-table-toolbar">
        <span className="admin-table-title">{title}</span>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flex: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <label className="admin-search" htmlFor={`search-${title}`}>
            <Search size={14} style={{ color: 'var(--admin-text-muted)', flexShrink: 0 }} />
            <input
              id={`search-${title}`}
              placeholder="Search…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </label>
          {onAdd && (
            <button className="admin-btn admin-btn-primary" onClick={onAdd} id={`add-${title.toLowerCase().replace(/\s+/g, '-')}-btn`}>
              <Plus size={14} />
              {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key as string}
                  onClick={() => col.sortable && toggleSort(col.key as string)}
                  style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    )}
                  </span>
                </th>
              ))}
              {(onEdit || onDelete) && <th style={{ width: 80 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="admin-empty">
                    <span style={{ fontSize: '2rem' }}>○</span>
                    <span>{search ? 'No results match your search.' : 'No records yet.'}</span>
                  </div>
                </td>
              </tr>
            ) : (
              paged.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key as string}>{renderCell(col, row)}</td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {onEdit && (
                          <button
                            className="admin-btn-icon"
                            onClick={() => onEdit(row)}
                            aria-label="Edit"
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className="admin-btn-icon danger"
                            onClick={() => onDelete(row)}
                            aria-label="Delete"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="admin-pagination">
          <span>
            {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="admin-pagination-btns">
            <button
              className="admin-btn admin-btn-ghost"
              style={{ padding: '0.3rem 0.65rem', minWidth: 0 }}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              ‹
            </button>
            <button
              className="admin-btn admin-btn-ghost"
              style={{ padding: '0.3rem 0.65rem', minWidth: 0 }}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
