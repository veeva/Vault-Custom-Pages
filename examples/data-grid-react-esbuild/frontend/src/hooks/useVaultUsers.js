import { useEffect, useMemo, useState } from 'react';

export default function useVaultUsers({ userRecords, initiatingUser }) {
    const [data, setData] = useState([]);

    const loadData = () => {
        const initiatingUserTimezone = extractTimezone(initiatingUser?.timezone__sys);
        const initiatingUserLocale = initiatingUser?.localeAdminKey;

        const userData = userRecords.map((userRecord) => {
            const created_date_local = formatDateTime(userRecord.created_date__v, initiatingUserLocale, initiatingUserTimezone);
            const created_data_utc = formatDateTime(userRecord.created_date__v, initiatingUserLocale);

            return {
                id: userRecord.id,
                username__sys: userRecord.username__sys,
                timezone__sys: userRecord.timezone__sys,
                created_date__v: created_data_utc,
                created_date_local
            }
        })

        setData(userData);
    }

    /*
        Extract the timezone from the timezone__sys field label
        e.g. "(GMT-06:00) Central Standard Time (America/Chicago)" => "America/Chicago"
     */
    const extractTimezone = (text) => {
        const betweenParenthesesRegex = /\(([^()]*)\)/g;
        const matches = [...text.matchAll(betweenParenthesesRegex)];

        let timezone = '';
        if (matches.length > 1) {
            timezone = matches[1][1];
        }

        return timezone;
    }

    /*
        Converts a UTC DateTime to provided locale and timezone
     */
    const formatDateTime = (utcDateTimeString, userLocale = 'en-US', userTimeZone = 'UTC') => {
        const utcDateTimeObj = new Date(utcDateTimeString);

        const formatter = new Intl.DateTimeFormat(userLocale.replace('_','-'), {
            timeZone: userTimeZone,
            timeZoneName: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });

        return formatter.format(utcDateTimeObj);
    }

    const columns = useMemo(() => [
        {
            accessorKey: 'id',
            header: () => 'ID',
            footer: props => props.column.id,
        },
        {
            accessorKey: 'username__sys',
            header: () => 'Username',
            footer: props => props.column.id,
        },
        {
            accessorKey: 'timezone__sys',
            header: () => 'Timezone',
            footer: props => props.column.id,
        },
        {
            accessorKey: 'created_date__v',
            header: 'Created Date (UTC)',
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
        {
            accessorKey: 'created_date_local',
            header: `Created Date (Local)`,
            footer: props => props.column.id,
            enableColumnFilter: false,
        },
    ], []);

    useEffect(() => {
        if (userRecords?.length > 0) {
            loadData();
        }
    }, [userRecords]);

    return {
        data,
        columns
    }
}