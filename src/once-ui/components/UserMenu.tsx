'use client';

import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Flex, User, UserProps } from '.';
import styles from './UserMenu.module.scss';

interface UserMenuProps extends UserProps {
    selected?: boolean;
    dropdown?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    minWidth?: string | number;
    maxWidth?: string | number;
    minHeight?: string | number;
}

const UserMenu: React.FC<UserMenuProps> = ({
    selected = false,
    dropdown,
    minWidth,
    maxWidth,
    minHeight,
    className,
    style,
    ...userProps
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} style={{ position: 'relative' }}>
            <Flex
                tabIndex={0}
                direction='column'
                padding='4'
                radius='full'
                cursor='interactive'
                border={selected ? 'neutral-medium' : 'transparent'}
                background={selected ? 'neutral-strong' : 'transparent'}
                className={classNames(
                    className || '',
                    selected ? styles.selected : '',
                    styles.wrapper
                )}
                style={style}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <User {...userProps} />
            </Flex>

            {isDropdownOpen && dropdown && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: 'var(--radius-m)',
                        boxShadow: 'var(--shadow-l)',
                        marginTop: '8px',
                        minWidth: minWidth,
                        maxWidth: maxWidth,
                        minHeight: minHeight,
                        overflow: 'hidden',
                    }}
                >
                    {dropdown}
                </div>
            )}
        </div>
    );
};

UserMenu.displayName = 'UserMenu';
export { UserMenu };
