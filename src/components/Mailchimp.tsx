'use client';

import {
    Background,
    Button,
    Column,
    Flex,
    Input,
    Text,
} from '@/once-ui/components';
import { SpacingToken } from '@/once-ui/types';
import { mailchimp } from '@/resources';
import {
    NewsletterFormValues,
    getNewsletterSchema,
} from '@/schemas/newsletter.schema';
import { NewsletterProps } from '@/types/content';
import { OpacityLevel } from '@/types/effects';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const Mailchimp = ({ newsletter }: { newsletter: NewsletterProps }) => {
    const locale = useLocale() as 'en' | 'fr';
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewsletterFormValues>({
        resolver: zodResolver(getNewsletterSchema(locale)),
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
                throw new Error(
                    errorData.error ||
                        newsletter.errorMessages[locale].serverError
                );
            }

            setIsSuccess(true);
            reset();
        } catch (error) {
            setServerError(
                error instanceof Error
                    ? error.message
                    : newsletter.errorMessages[locale].serverError
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
                {newsletter.title[locale]}
                <Text variant='body-default-m' onBackground='neutral-medium'>
                    {newsletter.description[locale]}
                </Text>
                {isSuccess ? (
                    <Text
                        variant='body-default-m'
                        onBackground='success-medium'
                    >
                        {newsletter.successMessage[locale]}
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
                                    placeholder={
                                        newsletter.placeholderText[locale]
                                    }
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
                                    {newsletter.buttonText[locale]}
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
