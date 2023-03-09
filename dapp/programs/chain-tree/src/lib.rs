use anchor_lang::prelude::*;

declare_id!("DaZske7f7vZnLmXrdp1LyAv7VDgdayKbRD2rWBgnEqud");

const MIN_USERNAME_LEN: usize = 3;
const MAX_USERNAME_LEN: usize = 30;
const MAX_METADATA_LEN: usize = 255;
const PROFILE_SPACE: usize = 8 + 32 + 1 + 32 + (4 + MAX_METADATA_LEN);

#[error_code]
pub enum AppError {
    #[msg("Username too large")]
    UsernameTooLarge,
    #[msg("Username too small")]
    UsernameTooSmall,
    #[msg("Username can only contain lowercase letters and numbers")]
    UsernameInvalidFormat,
    #[msg("Metadata too large")]
    MetadataTooLarge,
}

#[program]
pub mod chain_tree {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        username: String,
        metadata_url: String,
        metadata_hash: [u8; 32],
    ) -> Result<()> {
        if username.len() >= MAX_USERNAME_LEN {
            return err!(AppError::UsernameTooLarge);
        }

        if username.len() < MIN_USERNAME_LEN {
            return err!(AppError::UsernameTooSmall);
        }

        if metadata_url.len() >= MAX_METADATA_LEN {
            return err!(AppError::MetadataTooLarge);
        }

        if !username
            .chars()
            .all(|t| t.is_ascii_lowercase() || t.is_ascii_digit())
        {
            return err!(AppError::UsernameInvalidFormat);
        }

        ctx.accounts.profile.metadata_url = metadata_url.clone();
        ctx.accounts.profile.bump = *ctx.bumps.get("profile").unwrap();
        ctx.accounts.profile.authority = ctx.accounts.authority.key();
        ctx.accounts.profile.metadata_hash = metadata_hash.clone();

        Ok(())
    }

    pub fn update_profile(
        ctx: Context<UpdateProfile>,
        metadata_url: String,
        metadata_hash: [u8; 32],
    ) -> Result<()> {
        ctx.accounts.profile.metadata_url = metadata_url.clone();
        ctx.accounts.profile.metadata_hash = metadata_hash.clone();

        Ok(())
    }
}

#[account]
pub struct Profile {
    pub authority: Pubkey,
    pub metadata_hash: [u8; 32],
    pub bump: u8,

    pub metadata_url: String,
}

#[derive(Accounts)]
#[instruction(username: String)]
pub struct Initialize<'info> {
    #[account(
        init,
        seeds = [username.as_bytes()],
        bump,
        payer = authority,
        space = PROFILE_SPACE,
        owner = *program_id
    )]
    pub profile: Account<'info, Profile>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateProfile<'info> {
    #[account(
        mut,
        constraint = profile.authority == authority.key(),
    )]
    pub profile: Account<'info, Profile>,

    #[account()]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
