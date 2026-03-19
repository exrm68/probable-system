import React, { useState } from 'react';
import { AdultBannerItem } from '../types';
import AgeVerifyModal from './AgeVerifyModal';

interface AdultBannerSectionProps {
  items: AdultBannerItem[];
}

// ── Category গুলো বের করো ──
const getCategories = (items: AdultBannerItem[]) => {
  const cats = Array.from(new Set(items.map(i => i.category || 'General')));
  return ['All', ...cats];
};

const AdultBannerSection: React.FC<AdultBannerSectionProps> = ({ items }) => {
  const [verifyItem, setVerifyItem] = useState<AdultBannerItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  if (!items || items.length === 0) return null;

  const categories = getCategories(items);
  const filtered = activeCategory === 'All'
    ? items
    : items.filter(i => (i.category || 'General') === activeCategory);

  const handleConfirm = () => {
    if (verifyItem?.channelLink) {
      window.open(verifyItem.channelLink, '_blank');
    }
    setVerifyItem(null);
  };

  return (
    <>
      <div style={{ marginBottom: '28px' }}>

        {/* ── Section Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          marginBottom: '14px',
        }}>
          <span style={{
            width: 3, height: 18,
            background: 'linear-gradient(180deg, #ec4899, #8b5cf6)',
            borderRadius: '2px', display: 'inline-block',
            boxShadow: '0 0 8px rgba(236,72,153,0.5)',
          }} />
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '15px', fontWeight: 700,
            color: '#fff',
          }}>🔞 18+ Channel</span>
        </div>

        {/* ── Category Filter ── */}
        {categories.length > 2 && (
          <div className="no-scrollbar" style={{
            display: 'flex', gap: '8px',
            overflowX: 'auto', marginBottom: '14px',
            paddingBottom: '4px',
          }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px', fontWeight: 700,
                  cursor: 'pointer',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #ec4899, #8b5cf6)'
                    : 'rgba(255,255,255,0.07)',
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.5)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Content Grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setVerifyItem(item)}
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#1a1a1d',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)',
                transform: 'translateZ(0)',
              }}
            >
              {/* ── Thumbnail — full poster any size ── */}
              <div style={{ position: 'relative', paddingTop: '140%' }}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transform: 'translateZ(0)',
                  }}
                />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 50%, transparent 75%)',
                  pointerEvents: 'none',
                }} />

                {/* 18+ badge */}
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  borderRadius: '8px',
                  padding: '3px 8px',
                }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '10px', fontWeight: 900, color: '#fff',
                  }}>18+</span>
                </div>

                {/* Category badge */}
                {item.category && (
                  <div style={{
                    position: 'absolute', top: 8, left: 8,
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '8px', padding: '3px 8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '9px', fontWeight: 700,
                      color: 'rgba(255,255,255,0.8)',
                    }}>{item.category}</span>
                  </div>
                )}

                {/* Bottom content */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '10px 10px 12px',
                  pointerEvents: 'none',
                }}>
                  {/* Title */}
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '13px', fontWeight: 800,
                    color: '#fff',
                    marginBottom: '8px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    textShadow: '0 1px 6px rgba(0,0,0,0.9)',
                    lineHeight: '1.3',
                  }}>
                    {item.title}
                  </p>

                  {/* Watch Button */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                  }}>
                    <span style={{ fontSize: '11px' }}>▶</span>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '11px', fontWeight: 800,
                      color: '#fff', letterSpacing: '0.04em',
                    }}>WATCH NOW</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age Verify Modal */}
      <AgeVerifyModal
        isOpen={!!verifyItem}
        title={verifyItem?.title}
        onConfirm={handleConfirm}
        onExit={() => setVerifyItem(null)}
      />
    </>
  );
};

export default AdultBannerSection;
