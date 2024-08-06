INSERT INTO closet_codes (closet_code, is_used)
SELECT ' ', false
FROM DUAL
WHERE NOT EXISTS (
    SELECT 1 FROM closet_codes WHERE closet_code = 'A1B2C3'
);
