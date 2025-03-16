'use client';

import { mailchimp } from '@/app/resources';
import {
    Background,
    Button,
    Column,
    Flex,
    Heading,
    Input,
    Text,
} from '@/once-ui/components';
import { SpacingToken } from '@/once-ui/types';
import {
    NewsletterFormValues,
    newsletterSchema,
} from '@/schemas/newsletter.schema';
import { NewsletterProps } from '@/types/content';
import { OpacityLevel } from '@/types/effects';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewsletterFormValues>({
        resolver: zodResolver(newsletterSchema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: NewsletterFormValues) => {
        try {
            setIsSubmitting(true);
            setServerError(null);

            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: data.email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to subscribe');
            }

            setIsSuccess(true);
            reset();
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : 'An unexpected error occurred'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Column
            overflow='hidden'
            position='relative'
            fillWidth
            padding='xl'
            radius='l'
            marginBottom='m'
            horizontal='center'
            align='center'
            background='surface'
            border='neutral-medium'
        >
            <Background
                mask={{
                    cursor: mailchimp.effects.mask.cursor,
                    x: mailchimp.effects.mask.x,
                    y: mailchimp.effects.mask.y,
                    radius: mailchimp.effects.mask.radius,
                }}
                gradient={{
                    display: mailchimp.effects.gradient.display,
                    x: mailchimp.effects.gradient.x,
                    y: mailchimp.effects.gradient.y,
                    width: mailchimp.effects.gradient.width,
                    height: mailchimp.effects.gradient.height,
                    tilt: mailchimp.effects.gradient.tilt,
                    colorStart: mailchimp.effects.gradient.colorStart,
                    colorEnd: mailchimp.effects.gradient.colorEnd,
                    opacity: mailchimp.effects.gradient.opacity as OpacityLevel,
                }}
                dots={{
                    display: mailchimp.effects.dots.display,
                    color: mailchimp.effects.dots.color,
                    size: String(mailchimp.effects.dots.size) as SpacingToken,
                    opacity: mailchimp.effects.dots.opacity as OpacityLevel,
                }}
                grid={{
                    display: mailchimp.effects.grid.display,
                    color: mailchimp.effects.grid.color,
                    width: String(mailchimp.effects.grid.width),
                    height: String(mailchimp.effects.grid.height),
                    opacity: mailchimp.effects.grid.opacity as OpacityLevel,
                }}
                lines={{
                    display: mailchimp.effects.lines.display,
                    opacity: mailchimp.effects.lines.opacity as OpacityLevel,
                }}
            />
            <Column
                maxWidth='xs'
                gap='l'
                horizontal='center'
                align='center'
                style={{ textAlign: 'center' }}
            >
                <Heading variant='display-strong-s'>{newsletter.title}</Heading>
                <Text variant='body-default-m' onBackground='neutral-medium'>
                    {newsletter.description}
                </Text>
                {isSuccess ? (
                    <Text
                        variant='body-default-m'
                        onBackground='success-medium'
                    >
                        Thanks for subscribing!
                    </Text>
                ) : (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ width: '100%' }}
                    >
                        <Column gap='m' fillWidth>
                            <Flex
                                fillWidth
                                gap='m'
                                horizontal='center'
                                direction='row'
                                mobileDirection='column'
                            >
                                <Input
                                    id='newsletter-email'
                                    label='Email'
                                    labelAsPlaceholder
                                    placeholder='Enter your email'
                                    type='email'
                                    autoComplete='email'
                                    disabled={isSubmitting}
                                    {...register('email')}
                                    errorMessage={errors.email?.message}
                                    style={{ flex: 2 }}
                                />
                                <Button
                                    type='submit'
                                    variant='primary'
                                    disabled={isSubmitting}
                                    style={{ flex: 1, width: '100%' }}
                                >
                                    {isSubmitting
                                        ? 'Subscribing...'
                                        : 'Subscribe'}
                                </Button>
                            </Flex>
                            {serverError && (
                                <Text
                                    variant='body-default-s'
                                    onBackground='danger-medium'
                                >
                                    {serverError}
                                </Text>
                            )}
                        </Column>
                    </form>
                )}
            </Column>
        </Column>
    );
};
