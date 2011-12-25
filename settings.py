import os
TEMPLATE_DIRS = (os.path.join(os.path.dirname(__file__), 'dynamic'))
USE_I18N = True
_ = lambda s: s
LANGUAGES = (
    ('en', _('English')),
    ('tr', _('Turkish'))
)
LANGUAGE_CODE="tr"
ROOT_URLCONF = 'urls'